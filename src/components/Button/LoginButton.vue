<template>
  <span class="login-button" @click="login" v-if="!getlogin"><i class="fab fa-twitter"></i> {{text}}</span>
</template>

<script>
import firebase from 'firebase/app'
export default {
  props: {text:String},
  methods:{
    login() {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(
          result => {
            console.log("signin",result.user)
            if (result.user) {
              this.$router.go({path: this.$router.currentRoute.path, force: true})
            } else {
              alert("エラーが発生しました。")
            }
          }
        )
    },
  },
  computed:{
    getlogin() {
      return this.$store.getters.get_isLogin
    }
  }
}
</script>

<style scoped>
.login-button i {
  color: #55acee;
}
span {
  line-height: 45px;
  width: 100px;
  margin: 5px;
  cursor: pointer;
	display: block;
	text-align: center;
	text-decoration: none;
	color:  #55acee;
	background:#FFF;
	border-radius: 4px;
  border: 2px solid #55acee;
	box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), 0 2px 2px rgba(0, 0, 0, 0.19);
}
span:active {
	border-bottom: 2px solid #55acee;
	box-shadow: 0 0 2px rgba(0, 0, 0, 0.30);
}
</style>
