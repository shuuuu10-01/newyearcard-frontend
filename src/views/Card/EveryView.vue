<template>
  <div>
    <div class="card" v-if="isShow">
      <Gif :_gif="card.gif" :_text="card.text"/>
    </div>
  </div>
</template>

<script>
import Gif from '../../components/Gif/CompleteGif.vue'
export default {
  data () {
    return {
      words: [],
      card: {
        text:"",
        gif:"",
        uid: "",
        share: "",
      },
      isShow: false
    }
  },
  components: {
    Gif
  },
  methods: {
    showApi () {
      return this.axios.get(this.get_api_rails+this.$route.params.id+'/show', this.title)
      .then((response) => {
        this.card.text = response.data.data.text
        this.card.gif = response.data.data.gif
        this.card.uid = response.data.data.uid
        this.card.share = response.data.data.share
        this.isShow = true
        if(this.get_uid == this.card.uid){
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
        return true
      } else if (this.card.share==1){
        console.log("cU-1")
        await this.checkFriend()
        console.log("")
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
            return true
          } else {
            console.log("cF-false")
            alert("このページは限定公開に設定されています")
            throw new Error('throw Error');
          }
        }).catch(()=>{
          console.log("cF-e")
          alert("エラーが発生しました")
        })
      } else {
        alert("このページを確認するにはログインしてください")
        throw new Error('throw Error');
      }
    },
    async checkDM() {
      if(this.get_uid !="") {
        if(this.card.share == this.get_uid) {
          return true
        } else {
          alert("このページは限定公開に設定されています。")
          throw new Error('throw Error');
        }
      } else {
        alert("このページを確認するにはログインしてください。")
        throw new Error('throw Error');
      }
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
    }
  }
}
</script>

<style scoped>

</style>
