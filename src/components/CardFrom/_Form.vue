<template>
  <div class="form-wrap">
    <br>
    <h1>年賀状の作成</h1>
    <form class="form" @submit.prevent>
      <hooper/>
      <div class="form-input">
        <textarea type="text" name="message" placeholder="Message" v-model="card.text" required></textarea>
      </div>
      <div class="cp_ipselect cp_sl04">
        <select v-model="_share" required>
          <option value="" hidden>公開範囲の設定</option>
          <option value="0">公開</option>
          <option value="1">フォロワー限定</option>
          <option value="2">フォロワーを指定</option>
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
        <Gifpre _gif="card01" :_text="card.text" v-if="preview"/>
      </div>
  </div>
</template>

<script>
import Gifpre from '../Gif/__Gif.vue'
import Hooper from './__Hooper.vue'

export default {
  data () {
    return  {
      preview: false,
      words: [],
      api_url: "",
      card: {
        gif: "",
        text: "",
        share: "",
        name: "",
        dm: ""
      },
      dm: false
    }
  },
  components: {
    Gifpre,
    Hooper,
  },
  methods: {
    doPreview () {
      this.preview = !this.preview
    },
    complete () {
      if (this.$store.state.user.uid!=null) {
        this.name = this.$store.state.user.uid
      }
      if (this.card.gif=="") {
        alert("年賀状を選択してください")
        return 0;
      }
      if(!this.dm) {
        this.card.dm = this.card.share
      } 
      if(this.card.dm=="") { 
        alert("送りたい相手のtwitterIDを入力してください")
        return 0;
      }
      if(confirm("年賀状を作成してもよろしいですか？")){
        const data = {
          text: this.card.text,
          uid: this.card.name,
          gif: this.card.gif,
          share: this.card.dm
        }
        this.axios.post(this.api_url+'create',data)
        .then((response) => {
          console.log(response)
          if(response.data.status == "SUCCESS"){
          //作ったカードのページへ遷移
          this.$router.push({ path: `/card/${response.data.data.id}/show`})
          }
        })
      }
    },
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
     }
  },
  mounted: function(){
    this.api_url = process.env.VUE_APP_RAILS_API_POSTS
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
.gif-radio {
  cursor: pointer;
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


/* Hooper */
.hooper-sample__hooper{
  cursor:grab;
}
.hooper-sample__hooper:active{
  cursor:grabbing;
}
.hooper {
  height: 100%;
  width: 90%;
  margin: auto;
  padding-top: 10px;
}
.hooper-navigation{
  margin-top: 30px;
}
</style>
