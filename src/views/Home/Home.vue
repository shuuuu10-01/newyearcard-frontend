<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/logo.png">
    <API />
    <div class="signin">
      <button @click="signout">signout</button>
      <br>
      <img :src="geticon" />
      <p>{{user.displayName}}</p>
      <button @click="getData">on</button>
      <button @click="friendship">friendship</button>
    </div>
  </div>
</template>

<script>
import API from "../../components/API.vue"
import firebase from 'firebase'
export default {
  name: 'Home',
  data () {
    return {
      user: [],
      api_url: '',
      data: []
    }
  },
  components: {
    API
  },
  methods: {
    signout () {
      firebase.auth().onAuthStateChanged( (user) => {
        firebase.auth().signOut().then(()=>{
          console.log(user.displayName+"ログアウトしました");
          this.$store.dispatch("logoutUser");
          this.$router.go({path: this.$router.currentRoute.path, force: true})
        })
      });
    },
    getData() {
      this.user = this.$store.state.user
      console.log(this.$store.state)
    },
    friendship() { //cardを作成した人のuidとみる人のuidで関係性を確認
      this.axios.get(this.api_url+'3071362838/3190060951/friendships')
      .then((response) => {
        this.data = response.data.relationship.source
        console.log(this.data)
      })
    }
  },
  mounted: function (){
    this.api_url = process.env.VUE_APP_RAILS_API_TWITTER
    this.getData()
  },
  computed: {
    geticon() {
      return this.$store.getters.get_photoURL
    }
  }
}
</script>
