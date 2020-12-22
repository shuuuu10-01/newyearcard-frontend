<template>
  <div class="gif">
    <vue-freezeframe
      :options="{
        trigger: 'hover'
      }"
    ><img class="gif-freeze" :src="_src"></vue-freezeframe>
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
  width: 100%;
}
.gif .gif-freeze {
  width: 95%;
  margin: auto;
}

</style>
