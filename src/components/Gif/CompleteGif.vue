<template>
  <div class="gif">
    <img :src="gifname" />
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
    this.gifname = "/Gif/"+this._gif+".gif"
  }
}
</script>

<style scoped>
.gif {
  font-weight: 700;
  position: relative;
  width: 100%;
}
img {
  width: 100%;
}
/* */
.gif .card01{
  position: absolute;
  width: 45%;
  height: 35%;
  top: 65%;
  left: 55%;
  text-align: left;
  box-sizing: inherit;
  word-break: break-all;
  font-size: 3vw;
}
.gif .card02{
  position: absolute;
  width: 45%;
  height: 35%;
  top: 65%;
  left: 3%;
  text-align: left;
  box-sizing: inherit;
  word-break: break-all;
  font-size: 3vw;
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
}
</style>
