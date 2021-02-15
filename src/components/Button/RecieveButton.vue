<template>
  <div class="icon icon--plus" v-show="onRecieve&&get_login">
    <span class="icon__mark" @click="recieve"><i class="fas fa-plus"></i></span>
  </div>
</template>

<script>
export default {
  methods:{
    recieve(){
      if(confirm("年賀状を受け取りますか")){
        const data = {
          uid: this.get_uid,
          display_name: this.display_name,
          public_uid: this.$route.params.id
        }
        console.log(data)
        this.axios.post(this.get_recieve+'add',data,this.get_token).then((response)=>{
          console.log(response)
        }).catch(()=>{
          alert("すでに受け取っています")
        })
      }
    }
  },
  computed: {
    get_uid(){
      return this.$store.getters.get_user_uid
    },
    get_login(){
      return this.$store.getters.get_isLogin
    },
    get_recieve(){
      return this.$store.getters.get_API_RECIEVE
    },
    get_token(){
      return this.$store.getters.get_ACCESS_TOKEN
    }
  },
  props:{
    display_name:String,
    onRecieve: Boolean
  }
}
</script>

<style scoped>
.icon {
  z-index: 1;
  position: fixed;
  left: 10px;
  bottom: 60px;
  width: 70px;
  height: 70px;
  background:white;
  border: 2px solid #abbdc4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), 0 2px 2px rgba(0, 0, 0, 0.19);
  cursor: pointer;
}
.icon:hover{
  background: #ccc;
}
i{
  line-height: 70px;
  color: #484f52;
  font-size: 35px;
}
</style>
