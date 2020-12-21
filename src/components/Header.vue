<template>
  <header>
    <div class="logo">
      <p>NewMaker</p>
    </div>
    <div class="u-icon">
      <img :src="geticon" v-if="getlogin"/>
      <span class="login-button" @click="login" v-if="!getlogin"><i class="fa fa-twitter"></i> ログイン</span>
    </div>
  </header>
</template>

<script>
import firebase from 'firebase'
export default {
  methods: {
    login() {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(
          result => {
            console.log("signin",result.user)
            if (result.user) {
              this.$store.commit("setUser", result.user);
            } else {
              this.$store.commit("setUser", null);
            }
          })
    },
  },
  computed: {
    geticon() {
      return this.$store.getters.get_photoURL
    },
    getlogin() {
      return this.$store.getters.get_isLogin
    }
  }
}
</script>

<style scoped>
header {
  background-color: white;
  top: 0;
  height: 60px;
  width: 100%;
}
header .logo {
  float: left;
  height: 100%;
}

header .logo  p{
  font-size: 18px;
  margin-top: 18px;
  margin-left: 10px;
}
header .u-icon{
  float: right;
  margin-top: auto;
  margin-bottom: auto;
  height: 100%;
}
header .u-icon img {
  width: 50px;
  border-radius: 50%;
  margin-top: 5px;
  margin-right: 10px;
  box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), 0 2px 2px rgba(0, 0, 0, 0.19);
}
header .u-icon .login-button i {
  color: #55acee;
}
span.login-button {
  line-height: 45px;
  width: 100px;
  margin: 5px;
  cursor: pointer;
	display: block;
	text-align: center;
	text-decoration: none;
	color:  #55acee;
	background:#FFF;
	border-bottom: 2px solid #55acee;
	border-radius: 4px;
  border: 2px solid #55acee;
	box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), 0 2px 2px rgba(0, 0, 0, 0.19);
}
span.login-button:active {
	border-bottom: 2px solid #55acee;
	box-shadow: 0 0 2px rgba(0, 0, 0, 0.30);
}
</style>
