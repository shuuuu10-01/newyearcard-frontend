<template>
  <div class="gif">
    <video :src="gifname" loop autoplay muted playsinline/>
    <span :class="_gif">
      <nl2br class="nl2br" tag="div" :text="_text"/>
    </span>
  </div>
</template>

<script>
import Nl2br from 'vue-nl2br'
export default {
  data() {
    return {
      gifname: ""
    }
  },
  props: {
    _gif: String,
    _text: String,
  },
  components:{
    Nl2br
  },
  mounted(){
    this.gifname = "/Video/"+this._gif+".mp4"
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
</style>
