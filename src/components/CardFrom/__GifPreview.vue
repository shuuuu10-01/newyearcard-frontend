<template>
  <div class="gif-modal" v-if="isOpen">
    <div class="close" @click="isOpen = false"></div>
    <div class="gif-modal">
      <complete-gif calss="gif" :_text="get_form.text" :_gif="get_form.gif"/>
      <div class="modal_bg" v-show="isOpen" @click="isOpen = false"></div>
    </div>
  </div>
</template>

<script>
import CompleteGif from '../Gif/CompleteGif.vue'
export default {
  props:{
    isOpen:Boolean
  },
  components: {
    CompleteGif
  },
  computed:{
    get_form() {
      return this.$store.getters.get_form
    }
  }
}
</script>

<style scoped>
/*curcle*/
.close {
  top: 40px;
  right: 10px;
  z-index: 10;
	font-size: 30px;
	position: absolute;
	width: 1.4em;
	height: 1.4em;
	border: 0.1em solid white;
	border-radius: 100%;
  cursor: pointer;
  background-color:  rgba(0, 0, 0, 0.5);
}
/* 左 */
.close::before {
	position: absolute;
	top: 0.2em;
	left: 0.6em;
	width: 0.2em;
	height: 1em;
	content: "";
	background-color: white;
	transform: rotate(45deg);
}
/* 右 */
.close::after {
	position: absolute;
	top: 0.6em;
	left: 0.2em;
	width: 1em;
	height: 0.2em;
	content: "";
	background-color: white;
	transform: rotate(225deg);
}

.gif-modal {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  display: flex;
}
.gif-modal .gif{
  width: 95%;
  margin: auto;
  z-index: 2;
}
.modal_bg {
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
