<template>
  <div class="gif">
    <vue-freezeframe 
      :src="_src"
      :options="{
        trigger: 'hover'
      }"
    />
  </div>
</template>

<script>
import { VueFreezeframe } from 'vue-freezeframe'; //マウスをホバーしたらgif再生と停止

export default {
  components: {
    VueFreezeframe
  },
  props: {
    _src: String,
    _text: String
  }
}
</script>

<style scoped>
.gif {
  position: relative;
  height: 100%;  
}
.gif .text-zoon {
  position: absolute;
  width: 60%;
  height: 39%;
  top: 25%;
  left: 39%;
}
.gif .text-zoon p {
  text-align: left;
  box-sizing: inherit;
  width: 100%;
  word-break: break-all;
  font-size: 3vw;
}
</style>
