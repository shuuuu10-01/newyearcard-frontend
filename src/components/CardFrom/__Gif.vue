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
.gif vue-freezeframe {
  width: 100%;
}

</style>
