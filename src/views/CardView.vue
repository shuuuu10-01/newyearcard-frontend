<template>
  <div class="card">
    <card-preview />
    <div class="logo-gif">
      <vue-freezeframe 
        src="/img/shuuuu-logo.gif"
        :options="{
          trigger: 'hover'
        }"
      />
    </div>
    <!-- 停止した画像とGif画像の組み合わせで強引に -->
    <div class="logo-gif2">
      <img
        src="/img/shuuuu-logo_off.gif"
        onclick="this.src='/img/shuuuu-logo.gif'"
        width="100%"
      />
    </div>
  </div>
</template>

<script>
import CardPreview from '../components/CardView/_CardPreview.vue'
import { VueFreezeframe } from 'vue-freezeframe'; //マウスをホバーしたらgif再生と停止

export default {
  data () {
    return {
      imgName: 'shuuuu-logo.gif'
    }
  },
  components: {
    CardPreview,
    VueFreezeframe
  }
}
</script>

<style scoped>
.logo-gif {
  padding: 10px;
}
</style>
