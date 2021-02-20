<template>
  <div class="form-wrap">
    <br>
    <h1>年賀状の作成</h1>
    <form class="form" @submit.prevent>
      <hooper/>
      <!-- <position/> -->
      <div class="nologin" v-show="!get_login">
          <input type="text" :value="get_displayName" placeholder="ユーザー名(10文字まで)" maxlength='10' @input="updateName($event.target.value)">
        </div>
      <div class="form-input">
        <textarea type="text" name="message" placeholder="Message" :value="get_form.text" @input="updateText($event.target.value)" required></textarea>
      </div>
      <div class="cp_ipselect cp_sl04">
        <select v-model="_share" required>
          <option value="" hidden>公開範囲の設定</option>
          <option value="0">全体公開</option>
          <option value="1" v-if="get_login">フォロワー限定</option>
          <option value="2" v-if="get_login">フォロワーを指定</option>
        </select>
      </div>
      <p v-if="!get_login" class="form-p">Twitterにログインすることで公開範囲を設定できます</p>
        <div class="dm" v-show="dm">
          <input type="text" v-model="card.dm" placeholder="半角英数で入力してください">
          <p class="dm-p">@</p>
        </div>
        
      <div class="buttons">
        <div class="complete">
          <input type="submit" @click="complete" value="完成！！">
        </div>
        <div class="preview">
          <span class="preview-button" @click="doPreview">プレビュー</span>
          <gif-preview ref="pre"/>
        </div>
      </div>
    </form>
    <form-loading :nowloading="loading"/>
  </div>
</template>

<script>
import FormLoading from '../Loading/FormLoading.vue'
import GifPreview from './__GifPreview.vue'
import Hooper from './__Hooper.vue'
// import Position from './__PositionDrag.vue'

export default {
  data () {
    return  {
      preview: false,
      card: {
        share: "",
        dm: "",
        status:"",
      },
      dm: false,
      loading: false
    }
  },
  components: {
    Hooper,
    FormLoading,
    GifPreview,
    // Position,
  },
  methods: {
    updateText(value) {
      this.$store.commit("setText",value)
    },
    updateName(value) {
      this.$store.commit("setName",value)
    },
    doPreview () {
      if (this.get_form.gif=="") {
        alert("年賀状を選択してください")
        return 0;
      }
      this.$refs.pre.isOpen = !this.$refs.pre.isOpen
    },
    async complete () {
      if (this.get_uid!=null) {
        this.name = this.get_uid
      }
      if (this.get_form.gif=="") {
        alert("年賀状を選択してください")
        return 0;
      }
      if (this.get_form.text=="") {
        alert("メッサージを記入してください")
        return 0;
      }
      if (this.card.share=="") {
        alert("公開範囲を選択してください")
        return 0;
      }
      if(!this.dm) { //全体公開の場合
        this.card.status = this.card.share
      } else {
        //指定されたアカウントの確認
        if(this.card.dm=="") { //限定公開の場合
          alert("送りたい相手のtwitterIDを入力してください")
          return 0;
        } else {
          const check = await this.checkDM()
          if(!check){
            return 0;
          }
        }
      }
      if(confirm("年賀状を作成してもよろしいですか？")){
        this.loading = true
        const data = {
          text: this.get_form.text,
          uid: this.get_uid,
          gif: this.get_form.gif,
          share: this.card.status,
          display_name: this.get_displayName,
          DM_id: this.card.dm,
          top: this.get_position.top,
          left: this.get_position.left,
          width: this.get_position.width,
          height: this.get_position.height,
          select: this.get_position.select
        }
        this.axios.post(this.get_API_URL+'create',data)
        .then(response => {
          if(response.data.status == "SUCCESS"){
          //作ったカードのページへ遷移
          this.updateText("");
          this.$router.push({ path: `/card/${response.data.data.public_uid}/show`});
          }else {
            alert("エラーが発生しました。")
            this.loading = false
          }
        }).catch (()=>{
          alert("エラーが発生しました。")
          this.loading = false
        })
      }
    },
    checkDM() {
      return this.axios.get(this.get_api_twitter+this.get_uid+"/"+this.card.dm+"/check").then(response=>{
        if(response.data.relationship.source.followed_by==true){
          this.card.status = response.data.relationship.target.id_str
          return true
        }else if(response.data.relationship.source.followed_by==false){
          if(confirm("指定したユーザーはフォロワーではありませんがよろしいですか？")) {
            this.card.status = response.data.relationship.target.id_str
            return true
          }else {
            return false
          }
        }else {
          alert("ユーザーが見つかりませんでした")
        }
      }).catch(()=>{
        alert("ユーザーが見つかりませんでした")
      })
    }
  },
  computed: {
    _share: {
      get() {
        return this.card.share
      },
      set (value) {
        if(value == 2){
          this.card.share = value
          this.dm = true
        } else if (value == 0 || value == 1){
          this.card.share = value
          this.dm = false
        }
      }
    },
    get_uid() {
      return this.$store.getters.get_user_uid
    },
    get_displayName(){
      return this.$store.getters.get_user_displayName
    },
    get_form() {
      return this.$store.getters.get_form
    },
    get_login() {
      return this.$store.getters.get_isLogin
    },
    get_API_URL() {
      return this.$store.getters.get_API_URL
    },
    get_api_twitter() {
      return this.$store.getters.get_API_TWITTER
    },
    get_position() {
      return this.$store.getters.get_position
    },
  }
}
</script>
<style scoped>
.form-wrap {
  background-color: rgba(214, 75, 11,0.85);
  box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), 4px 4px 4px rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  height: auto;
  width: 90%;
  max-width: 800px;
  margin: auto;
}
.form-wrap h1 {
  margin: auto;
  background-color: white;
  border-radius: 30px;
  width: 50%;
  font-size: 4vw;
}
@media (min-width: 888px) {
  .form-wrap h1 {
    font-size: 35px;
  }
}
.form .form-p {
  margin: auto;
  color: #5e5c5c;
  background-color: white;
  border: 2px solid #cfcfcf;
  border-radius: 5px;
  font-size: 12px;
  width: 70%;
  max-width: 400px;
}

.form-input {
  position: relative;
	width: 80%;
  margin: auto;
}
label{
  color: white;
}

textarea {
  font-size: 1em;
  padding: 15px 10px 10px;
  font: 15px/24px sans-serif;
  background: white;
  color: #5e5c5c;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  -moz-background-clip: padding;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  min-width: 80%;
  max-width: 100%;
  min-height: 100px;
  max-height: 120px;
  border: 2px solid #cfcfcf;
  margin-bottom: 10px;
}

.buttons{
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
/*dm*/
.dm {
  position: relative;
  margin: auto;
	width: 64%;
}
.dm input[type=text] {
	box-sizing: border-box;
  color: #5e5c5c;
	width: 100%;
  height: 30px;
	padding-left: 35px;
  border: 2px solid #cfcfcf;
	border-radius: 5px;
}
.dm input[type='text']:focus {
  outline: none;
}
.dm input[type='text']:focus::after {
	outline: black
}
.dm .dm-p {
  position: absolute;
  line-height: 30px;
  top: 0;
  left: 10px;
  color: #5e5c5c;
  margin: 0;
}
/* プルダウンの選択 */
.cp_ipselect {
  overflow: hidden;
  padding-left: 10px;
  width:62%;
	margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
	text-align: center;
}
.cp_ipselect select {
	width: 100%;
	padding-right: 1em;
	cursor: pointer;
	text-indent: 0.01px;
	text-overflow: ellipsis;
	border: none;
	outline: none;
	background: transparent;
	background-image: none;
	box-shadow: none;
	-webkit-appearance: none;
	appearance: none;
}
.cp_ipselect select::-ms-expand {
  display: none;
}
.cp_ipselect.cp_sl04 {
	position: relative;
	border: 2px solid #cfcfcf;
  border-radius: 5px;
	background: #ffffff;
}
.cp_ipselect.cp_sl04::before {
	position: absolute;
	top: 0.8em;
	right: 0.8em;
	width: 0;
	height: 0;
	padding: 0;
	content: '';
	border-left: 6px solid transparent;
	border-right: 6px solid transparent;
	border-top: 6px solid #cfcfcf;
	pointer-events: none;
}
.cp_ipselect.cp_sl04 select {
  height: 30px;
	color: #5e5c5c;
}

span.preview-button {
  margin: 10px;
  margin-left: 20px;
  line-height: 26px;
  width: 100px;
  height: 26px;
  font-size: 12px;
  cursor: pointer;
	display: block;
	color:   #5e5c5c;
	background:#FFF;
	border-radius: 5px;
  border: 2px solid #cfcfcf;
	box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), 0 2px 2px rgba(0, 0, 0, 0.19);
}
span.preview-button:active {
	border-bottom: 2px solid #cfcfcf;
	box-shadow: 0 0 2px rgba(0, 0, 0, 0.30);
}
.complete input{
  background:#FFF;
  color: #5e5c5c;
	box-sizing: border-box;
	width: 100px;
  height: 30px;
  margin: 10px;
  margin-right: 20px;
  border: 2px solid #cfcfcf;
	border-radius: 5px;
  cursor: pointer;
}
.complete input:active {
	border-bottom: 2px solid #cfcfcf;
	box-shadow: 0 0 2px rgba(43, 42, 42, 0.3);
}

.nologin input[type=text] {
  padding-left: 10px;
	box-sizing: border-box;
  color: #5e5c5c;
	width:64%;
  height: 30px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 2px solid #cfcfcf;
	border-radius: 5px;
}
.nologin input[type='text']:focus {
  outline: none;
}
.nologin input[type='text']:focus::after {
	outline: black
}
</style>
