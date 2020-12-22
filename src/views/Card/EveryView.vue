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
        console.log(this.card.share,"showwww")
        return true
      }).catch(()=>{ //error処理
        throw new Error('throw Error');
      })
    },
    async checkUser() {
      if (this.card.share==0) {
        console.log("cU-0-ok")
        return 'clear'
      } else if (this.card.share==1){
        console.log("cU-1")
        this.checkFriend().then(()=>{
          console.log("cU-1-ok")
          return 'clear'
        }).catch(()=>{
          console.log("cU-1-no")
          throw new Error('throw Error');
        })
      } else {
        this.checkDM().then(result=>{
          console.log(result)
          return 'clear'
        }).catch(()=> {
          throw new Error('throw Error');
        })
      }
    },
    async checkFriend() { //cardを作成した人のuidとみる人のuidで関係性を確認
      if(this.get_uid !="") {
        this.axios.get(this.get_api_twitter+this.card.uid+'/'+this.get_uid+'/friendships')
        .then(response => {
          console.log(response)
          if (response.data.relationship.source.followed_by){
            return 'clear'
          } else {
            alert("このページは限定公開に設定されています")
            throw new Error('throw Error');
          }
        }).catch(()=>{
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
          return 'clear'
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
    await this.showApi();
    console.log("show")
    await this.checkUser();
    console.log("check")
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
