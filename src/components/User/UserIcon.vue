<template>
  <div class="usericon">
    <img :src="get_icon"/>
    <h1>{{get_displayname}}</h1>
  </div>
</template>

<script>
export default {
  computed: {
    get_icon() {
      return this.$store.getters.get_user_photoURL
    },
    get_displayname(){
      return this.$store.getters.get_user_displayName
    }
  }
}
</script>

<style scoped>
.usericon{
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  width: 80%;
  background-color: white;
  border-bottom: 2px solid  #abbdc4;
	/* box-shadow: inset 0 4px 0 rgba(255,255,255,0.2), 0 2px 2px rgba(0, 0, 0, 0.19); */
  /* border-radius: 5px; */
}
.usericon img {
  height: 150px;
  margin-top: 20px;
  border-radius: 50%;
  box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), 0 2px 2px rgba(0, 0, 0, 0.19);
}
</style>
