<template>
  <div class="page">
    <user-icon/>
    <div class="user-contents">
      <user-cards :uid="get_uid"/>
    </div>
  </div>
</template>

<script>
import UserCards from '../../components/User/UserCards.vue';
import UserIcon from '../../components/User/UserIcon.vue'
export default {
  components: { UserIcon, UserCards },
  mounted: async function() {
    await this.$store.dispatch("auth");
    console.log("auth")
    if(!this.get_login){
      alert("ログインしてください")
      this.$router.push('/')
    }
  },
  computed:{
    get_login(){
      return this.$store.getters.get_isLogin
    },
    get_uid(){
      return this.$store.getters.get_user_uid
    }
  }
}
</script>

<style scoped>
.page{
  margin: auto;
  margin-top: 20px;
  background-color: white;
  width: 95%;
  border: 2px solid  #abbdc4;
  border-radius: 5px;
	box-shadow: inset 0 4px 0 rgba(255,255,255,0.2), 0 2px 2px rgba(0, 0, 0, 0.19);
}
</style>
