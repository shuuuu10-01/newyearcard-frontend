<template>
  <div>
    <div class="card" v-if="isShow">
      <Gif :_gif="card.gif" :_text="card.text"/>
    </div>
    <div class="address" v-if="isShow">
      <p class="title">電子はがき</p>
      <img src="../../assets/kitte.png">
      <div class="guest">
        <p>新年のあいさつ</p>
        <br>
        <h1 class="ml2">
          <span class='letter' v-for="word in get_displayname" :key="word.num">{{word}}</span>
          <span class='letter'>様</span>
        </h1>
      </div>
      <div class="user">
        <p>親愛なるあなたの友人</p>
        <h1 class="ml3">
          <span class='letter' v-for="word in words" :key="word.num">{{word}}</span>
        </h1>
      </div>
    </div>
    <div class="twitter">
      <a href="//twitter.com/share" class="twitter-share-button" data-text="年賀状をWebアプリで作ってみた" :data-url="'https://newyeaercard.netlify.app/#'+$route.path" data-lang="ja">
        Tweet
      </a>
    </div>
    <login-mordal v-if="isOpen"/>
    <view-loading :nowloading="!isShow"/>
  </div>
</template>

<script>
import Gif from '../../components/Gif/CompleteGif.vue'
import anime from 'animejs'
import LoginMordal from '../../components/CardView/_LoginMordal.vue'
import ViewLoading from '../../components/Loading/ViewLoading.vue'
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
      isOpen: false
    }
  },
  components: {
    Gif,
    LoginMordal,
    ViewLoading
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
        this.words = response.data.data.display_name.split('');
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
        console.log("cU-0-ok")
        this.isShow = true
        return true
      } else if (this.card.share==1){
        console.log("cU-1")
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
          console.log(response)
          if (response.data.relationship.source.followed_by){
            console.log("cF-true")
            this.isShow = true
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
    guestAnime() {
      anime.timeline({loop: true})
      .add({
        targets: '.ml2 .letter',
        scale: [4,1],
        opacity: [0,1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 950,
        delay: (el, i) => 70*i
      }).add({
        targets: '.ml2',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 5000
      });
    },
    userAnime() {
      anime.timeline({loop: true})
      .add({
        targets: '.ml3 .letter',
        scale: [4,1],
        opacity: [0,1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 950,
        delay: (el, i) => 70*i
      }).add({
        targets: '.ml2',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 5000
      });
    }
  },
  mounted: async function() {
    await this.$store.dispatch("auth");
    console.log("auth")
    const self = await this.showApi();
    console.log(self)
    if (self) {
      await this.checkUser();
      console.log("check")
    }
    this.guestAnime()
    this.userAnime()
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
      let user =  this.$store.getters.get_user_displayName.split('');
      console.log("ads",user)
      if(user.length==0){
        let sample = "あなた"
        user=sample.split('');
      }
      return user
    },
    get_login(){
      return this.$store.getters.get_isLogin
    }
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
.twitter{
  margin-top: 100px;
}
</style>
