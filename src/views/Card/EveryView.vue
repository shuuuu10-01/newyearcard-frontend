<template>
  <div>
    <div class="card" v-if="isShow">
      <Gif :_gif="card.gif" :_text="card.text"/>
    </div>
    <div class="address" v-if="isShow">
      <p class="title">電子はがき</p>
      <img src="../../assets/kitte.png">
      <div class="guest">
        <p>謹賀新年</p>
        <br>
        <h1>
          {{get_displayname}} 様
        </h1>
      </div>
      <div class="user">
        <p>今年もよろしくお願いします</p>
        <h1 class="ml3">
          <span class='letter'>{{card.displayname}}</span>
        </h1>
      </div>
    </div>
    <div class="buttons">
      <tweet-button class="tweet"/>
      <link-copy class="copy"/>
    </div>
    <login-mordal v-if="isOpen"/>
    <happy-new-year v-if="isShow"/>
    <view-loading :nowloading="!isShow"/>
    <recieve-button :display_name="card.displayname" :onRecieve="onRecieve"/>
    <form-button v-if="isShow" />
  </div>
</template>

<script>
import Gif from '../../components/Gif/CompleteGif.vue'
import LoginMordal from '../../components/CardView/_LoginMordal.vue'
import ViewLoading from '../../components/Loading/ViewLoading.vue'
import TweetButton from '../../components/Button/TweetButton.vue'
import LinkCopy from '../../components/Button/LinkCopy.vue'
import HappyNewYear from '../../components/Loading/_HappyNewYear.vue'
import RecieveButton from '../../components/Button/RecieveButton.vue'
import FormButton from '../../components/Button/FormButton.vue'
export default {
  data () {
    return {
      words: [],
      card: {
        text:"",
        gif:"",
        uid: "",
        share: "",
        displayname:""
      },
      isShow: false,
      isOpen: false,
      onRecieve: false,
      username: "あなた"
    }
  },
  components: {
    Gif,
    LoginMordal,
    ViewLoading,
    TweetButton,
    LinkCopy,
    HappyNewYear,
    RecieveButton,
    FormButton
  },
  methods: {
    showApi () {
      return this.axios.get(this.get_api_rails+this.$route.params.id+'/show', this.title)
      .then((response) => {
        this.card.text = response.data.data.text
        this.card.gif = response.data.data.gif
        this.card.uid = response.data.data.uid
        this.card.share = response.data.data.share
        this.card.displayname = response.data.data.display_name
        if(this.get_uid == this.card.uid){
          console.log("you!!")
          this.isShow = true
          return false
        }
        console.log(this.card.share,"showwww")
        return true
      }).catch(()=>{ //error処理
        alert("カードが存在しません")
        this.$router.push("/")
        return false
      })
    },
    async checkUser() {
      if (this.card.share==0) {
        this.isShow = true
        this.onRecieve = true
        return true
      } else if (this.card.share==1){
        await this.checkFriend()
      } else {
        await this.checkDM();
        
      }
    },
    async checkFriend() { //cardを作成した人のuidとみる人のuidで関係性を確認
    console.log("startCheck")
      if(this.get_uid !="") {
        await this.axios.get(this.get_api_twitter+this.card.uid+'/'+this.get_uid+'/friendships')
        .then(response => {
          if (response.data.relationship.source.followed_by){
            this.isShow = true
            this.onRecieve = true
            return true
          } else {
            console.log("cF-false")
            alert("このページは限定公開に設定されています")
            this.$router.push("/")
            throw new Error('throw Error');
          }
        }).catch(()=>{
          console.log("cF-e")
          alert("エラーが発生しました")
          this.$router.push("/")
        })
      } else {
        alert("このページを確認するにはログインしてください")
        this.isOpen=true
        throw new Error('throw Error');
      }
    },
    async checkDM() {
      if(this.get_uid !="") {
        if(this.card.share == this.get_uid) {
          this.isShow = true
          this.onRecieve = true
          return true
        } else {
          alert("このページは限定公開に設定されています。")
          this.$router.push("/")
          throw new Error('throw Error');
        }
      } else {
        alert("このページを確認するにはログインしてください。")
        this.isOpen=true
        throw new Error('throw Error');
      }
    },
  },
  mounted: async function() {
    await this.$store.dispatch("auth");
    const self = await this.showApi();
    if (self) {
      await this.checkUser();
    }
  },
  computed: {
    get_api_rails() {
      return this.$store.getters.get_API_URL
    },
    get_api_twitter() {
      return this.$store.getters.get_API_TWITTER
    },
    get_uid() {
      return this.$store.getters.get_user_uid
    },
    get_displayname() {
      if(this.$store.getters.get_user_displayName==""){
        return this.username
      }
      return this.$store.getters.get_user_displayName
    },
    get_login(){
      return this.$store.getters.get_isLogin
    },
  }
}
</script>

<style scoped>
.card {
  width: 90%;
  margin-top:  20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  z-index: -1;
  position: relative;
}
.address{
  position: relative;
  background-color: rgba(255, 255, 255, 1);
  border: 5px solid #bb4646;
	border-radius: 5px;
  margin: auto;
  width: 90%;
  height: 40vw;
}
.address .title{
  color: #bb4646;
  font-weight: 700;
  margin-top: 5px;
  font-size: 3vw;
}
.address img{
  position: absolute;
  width: 10vw;
  top: 20px;
  left: 30px;
}
.address .guest{
  display: inline-block;
  position: absolute;
  text-align: left;
  top: 25%;
  left: 25%;
  width: 60%;
  height: 50%;
}
.address .guest p{
  font-weight: 700;
  font-size: 3vw;
  margin: 0;
}
.address .guest h1{
  font-weight: 900;
  font-size: 5vw;
  margin: 0;
}
.address .user{
  position: absolute;
  text-align: right;
  top: 75%;
  right: 10%;
  width: 60%;
  height: 50%;
}
.address .user p{
  font-weight: 600;
  font-size: 2vw;
  margin: 0;
}
.address .user h1{
  font-weight: 800;
  font-size: 3vw;
  margin: 0;
}
.buttons {
  margin-top: 100px;
  align-items: center;
  justify-content: center;
  display: flex;
}
.buttons .tweet{
  margin-right: 15px;
}
.buttons .copy{
  margin-left: 15px;
}
</style>
