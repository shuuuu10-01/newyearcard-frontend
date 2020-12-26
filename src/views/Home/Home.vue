<template>
  <div class="home">
    <img alt="Vue logo" src="../../assets/title.png">
    <div class="create">
      <span class="create-button" @click="push_new">年賀状を作成する</span>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    push_new() {
      this.$router.push("/card/new")
    }
  }
}
</script>

<style scoped>
.create-button {
  line-height: 45px;
  width: 200px;
  margin: auto;
  cursor: pointer;
	display: block;
	text-align: center;
	text-decoration: none;
	color: #5e5c5c;
	background:#FFF;
	border-radius: 4px;
  border: 2px solid#5e5c5c;
	box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), 0 2px 2px rgba(0, 0, 0, 0.19);
}
.create-button:active {
	border-bottom: 2px solid #5e5c5c;
	box-shadow: 0 0 2px rgba(0, 0, 0, 0.30);
}
img{
  width: 60%;
  margin-top: 10%;
  margin-bottom: 30%;
}
</style>
