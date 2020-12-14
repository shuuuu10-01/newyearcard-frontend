<template>
  <header>
    <div class="logo">
      <p>NewMaker</p>
    </div>
    <div class="u-icon">
      <img :src="icon" v-show="isLogin"/>
    </div>
    <button @click="login" v-show="!isLogin">ログイン</button>
  </header>
</template>

<script>
export default {
  data () {
    return {
      icon: "",
      isLogin: false
    }
  },
  methods: {
    login() {
      console.log(this.icon)
      this.geticon()
    },
    geticon() {
      this.icon = this.$store.state.user.photoURL
      this.isLogin = this.$store.state.isLogin
    }
  },
  mounted: function() {
    if (this.$store.state.isLogin) {
      this.icon = this.$store.state.user.photoURL
      this.isLogin = this.$store.state.isLogin
      console.log(this.icon)
    }
    else {
      console.log(this.icon)
    }
  }
}
</script>

<style scoped>
header {
  background-color: whitesmoke;
  position: top;
  height: 60px;
  width: 100vw;
}
header .logo {
  float: left;
  margin-top: auto;
  margin-bottom: auto;
  padding-left: 10px;
}
.u-icon{
  float: right;
  margin-right: 20px;
  margin-bottom: auto; 
}
.u-icon img {
  width: 50px;

}
</style>
