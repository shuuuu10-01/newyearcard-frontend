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
    async showApi () {
      this.axios.get(this.get_api_rails+this.$route.params.id+'/show', this.title)
      .then((response) => {
        this.card.text = response.data.data.text
        this.card.gif = response.data.data.gif
        this.card.uid = response.data.data.uid
        this.card.share = response.data.data.share
        this.isShow = true
        console.log(this.card.share)
      }).catch((response)=>{ //error処理
        console.log(response)
      })
    },
    async checkUser() {
      if (this.card.share==0) {
        return true
      } else if (this.card.share==1){
        this.checkFriend().then(result=>{
          console.log(result)
          return result
        })
      } else {
        this.checkDM().then(result=>{
          console.log(result)
          return result
        })
      }
    },
    async checkFriend() { //cardを作成した人のuidとみる人のuidで関係性を確認
      if(this.get_uid !="") {
        this.axios.get(this.get_api_twitter+this.card.uid+'/'+this.get_uid+'/friendships')
        .then(response => {
          console.log(response)
          if (response.data.relationship.source){
            return true
          } else {
            alert("このページは限定公開に設定されています。")
            return false
          }
        })
      }else {
        alert("このページを確認するにはログインしてください。")
        return false
      }
    },
    async checkDM() {
      if(this.get_uid !="") {
        if(this.card.share == this.get_uid) {
          return true
        } else {
          alert("このページは限定公開に設定されています。")
          return false
        }
      } else {
        alert("このページを確認するにはログインしてください。")
        return false
      }
    }
  },
  mounted: function() {
    this.api_url = process.env.VUE_APP_RAILS_API_POSTS
    this.showApi().then(()=>{
      this.checkUser().then(result=>{
        if(result) {
          //フォローの関係を見て見るとこができる場合
        } else {
          //見れない場合
        }
      })
    })
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
