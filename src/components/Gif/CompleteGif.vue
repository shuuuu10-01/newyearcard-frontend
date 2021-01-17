<template>
  <div class="gif">
    <video :src="gifname" loop autoplay muted playsinline id="video"/>
    <div class="custom" :style="[styles, font]" v-if="get_position.select">
      <nl2br class="nl2br" tag="div" :text="_text"/>
    </div>
    <!-- 今までの表示の仕組み -->
    <div :class="_gif" v-if="!get_position.select">
      <nl2br class="nl2br" tag="div" :text="_text"/>
    </div>
  </div>
</template>

<script>
import Nl2br from 'vue-nl2br'
export default {
  data() {
    return {
      gifname: "",
      styles: {
        top:"",
        left: "",
        height: "",
        width: ""
      },
      video:{
        height: 0,
        width: 0
      },
      font:{
        fontSize: "20px"
      }
    }
  },
  props: {
    _gif: String,
    _text: String,
  },
  components:{
    Nl2br
  },
  methods:{
    setVideo(){
      const width = document.getElementById('video').clientWidth
      const height = document.getElementById('video').clientHeight
      this.video.width = width
      this.video.height = height
      this.font = {
      fontSize: width*0.03+'px'
      }
    },
  },
  mounted(){
    this.gifname = "/Video/"+this._gif+".mp4"
    this.styles = {
      top: this.get_position.top+"%",
      left: this.get_position.left+"%",
      height: this.get_position.height+"%",
      width: this.get_position.width+"%",
    }
    this.setVideo()
    window.addEventListener('resize', this.setVideo)
  },
  computed: {
    get_position() {
      return this.$store.getters.get_position
    },
  },
  watch: {
    get_position(){
      this.setVideo()
    }
  }
}
</script>

<style scoped>
.gif {
  font-weight: 700;
  position: relative;
  width: 100%;
}
video {
  width: 100%;
}
/* */
.gif .card01{
  position: absolute;
  width: 45%;
  height: 35%;
  top: 60%;
  left: 55%;
  text-align: left;
  box-sizing: inherit;
  word-break: break-all;
  font-size: 3vw;
  overflow: hidden;
}
.gif .card02{
  position: absolute;
  width: 60%;
  height: 35%;
  top: 60%;
  left: 3%;
  text-align: left;
  box-sizing: inherit;
  word-break: break-all;
  font-size: 3vw;
  overflow: hidden;
}
.gif .card03{
  position: absolute;
  width: 60%;
  height: 35%;
  top: 65%;
  left: 20%;
  text-align: left;
  box-sizing: inherit;
  word-break: break-all;
  font-size: 3vw;
  overflow: hidden;
}
.custom {
  position: absolute;
  text-align: left;
  box-sizing: inherit;
  word-break: break-all;
  font-size: 3vw;
  overflow: hidden;
}
</style>
