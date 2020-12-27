<template>
  <div class="modal">
    <div class="contents">
      <p>ログインしてください</p>
      <login-button class="button" text="ログイン"/>
    </div>
  </div>
</template>

<script>
import LoginButton from '../Button/LoginButton.vue'
export default {
  components: { LoginButton },
}
</script>

<style scoped>
.modal{
  z-index: 199;
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color:  rgb(82, 80, 79);
  align-items: center;
  justify-content: center;
}
.modal .contents{
  z-index: 200;
  width: 50%;
  padding-top: 5em;
  padding-bottom: 5em;
  margin: auto;
  text-align: center;
  background-color: white;
  border-radius: 4px;
  border: 5px solid #55acee;
}
.modal .contents .button {
  margin: auto;
}
.modal .contents p{
  font-size: 20px;
  font-weight: 700;
}
</style>
