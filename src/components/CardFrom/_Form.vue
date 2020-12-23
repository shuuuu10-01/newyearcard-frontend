<template>
  <div class="form-wrap">
    <br>
    <h1>年賀状の作成</h1>
    <form class="form" @submit.prevent>
      <hooper/>
      <div class="form-input">
        <textarea type="text" name="message" placeholder="Message" :value="get_form.text" @input="updateText($event.target.value)" required></textarea>
      </div>
      <div class="cp_ipselect cp_sl04">
        <select v-model="_share" required>
          <option value="" hidden>公開範囲の設定</option>
          <option value="0">公開</option>
          <option value="1" v-if="get_login">フォロワー限定</option>
          <option value="2" v-if="get_login">フォロワーを指定</option>
        </select>
      </div>
      <div class="dm" v-show="dm">
          <input type="text" v-model="card.dm" placeholder="twitterID">
          <p>@</p>
        </div>
      <div class="complete">
        <input type="submit" @click="complete" value="完成！！">
      </div>
    </form>
    <div class="preview">
      <button @click="doPreview">preview</button>
      <Gifpre :_gif="get_form.gif" :_text="get_form.text" v-if="preview"/>
    </div>
    <form-loading :nowloading="loading"/>
  </div>
</template>

<script>
import Gifpre from '../Gif/CompleteGif.vue'
import FormLoading from '../Loading/Form_Loading.vue'
import Hooper from './__Hooper.vue'

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
    Gifpre,
    Hooper,
    FormLoading,
  },
  methods: {
    updateText(value) {
      this.$store.commit("setText",value)
    },
    doPreview () {
      this.preview = !this.preview
    },
    async complete () {
      if (this.get_uid!=null) {
        this.name = this.get_uid
      }
      if (this.get_form.gif=="") {
        alert("年賀状を選択してください")
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
      console.log("c-DM")
      const data = {
        text: this.get_form.text,
        uid: this.get_uid,
        gif: this.get_form.gif,
        share: this.card.status
      }
      console.log(data)
      if(confirm("年賀状を作成してもよろしいですか？")){
        this.loading = true
        const data = {
          text: this.get_form.text,
          uid: this.get_uid,
          gif: this.get_form.gif,
          share: this.card.status
        }
        this.axios.post(this.get_API_URL+'create',data)
        .then(response => {
          console.log(response)
          if(response.data.status == "SUCCESS"){
          //作ったカードのページへ遷移
          this.updateText("");
          this.$router.push({ path: `/card/${response.data.data.id}/show`});
          }
        }).catch (()=>{
          alert("エラーが発生しました。")
          this.loading = false
        })
      }
    },
    checkDM() {
      return this.axios.get(this.get_api_twitter+this.get_uid+"/"+this.card.dm+"/check").then(response=>{
        console.log(response)
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
  margin: auto;
}
.form-wrap h1 {
  margin: auto;
  background-color: white;
  border-radius: 30px;
  width: 50%;
  font-size: 4vw;
}
.form p {
  margin: 0;
  transition: 0.3s;
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
  color: black;
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
}
.preview {
  width: 90%;
  margin: auto;
}

/*dm*/
.dm {
  position: relative;
  margin: auto;
  width: 35%;
}
.dm input[type=text] {
  font: 15px/24px sans-serif;
	box-sizing: border-box;
	width: 100%;
	padding-left: 35px;
  border: 2px solid #cfcfcf;
	border-radius: 17.5px;
}
.dm input[type='text']:focus {
  outline: none;
}
.dm input[type='text']:focus::after {
	outline: none;
}
.dm p {
  position: absolute;
  top:4px;
  left: 14px;
	transition: 0.3s;
  color: #000000;
  font: 15px/24px sans-serif;
}
/* プルダウンの選択 */
.cp_ipselect {
  overflow: hidden;
  padding-left: 10px;
	width: 40%;
	margin: auto auto 5px auto;
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
  border-radius: 10px;
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
	padding: 8px 38px 8px 8px;
	color:#575656;
}
</style>
