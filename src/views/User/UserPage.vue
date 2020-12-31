<template>
  <div class="page">
    <user-icon/>
    <div class="user-contents">
      <receive-card :uid="get_uid"/>
      <user-cards :uid="get_uid"/>
    </div>
    <div class="logout">
      <span @click="signout"><i class="fab fa-twitter"></i> ログアウト</span>
    </div>
    <form-button/>
  </div>
</template>

<script>
import ReceiveCard from '../../components/User/ ReceiveCard.vue';
import UserCards from '../../components/User/UserCards.vue';
import UserIcon from '../../components/User/UserIcon.vue';
import FormButton from '../../components/Button/FormButton.vue'
import firebase from 'firebase/app'
export default {
  components: { 
    UserIcon, 
    UserCards, 
    ReceiveCard,
    FormButton,
  },
  methods:{
    signout () {
      firebase.auth().onAuthStateChanged( (user) => {
        firebase.auth().signOut().then(()=>{
          console.log(user.displayName+"ログアウトしました");
          this.$store.dispatch("logoutUser");
          this.$router.push('/')
        })
      });
    },
  },
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
.logout span {
  z-index: 200;
  line-height: 45px;
  height: 45px;
  width: 110px;
  margin: auto;
  margin-bottom: 10px;
  cursor: pointer;
	display: block;
	text-align: center;
	text-decoration: none;
	color:   #ee8179;
	background:#FFF;
	border-radius: 4px;
  border: 2px solid  #ee8179;
	box-shadow: inset 0 4px 0 rgba(255,255,255,0.2), 0 2px 2px rgba(0, 0, 0, 0.19);
}
.logout span:hover{
  background:#f5c3c098;
}
</style>
