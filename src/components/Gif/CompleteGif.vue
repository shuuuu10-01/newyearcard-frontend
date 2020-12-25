<template>
  <div class="gif">
    <img :src="gifname" />
    <span :class="_gif">
        <nl2br tag="div" :text="_text"/>
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
  position: relative;
  height: 100%;  
}
img {
  width: 100%;
}
/* */
.gif .card01 {
  position: absolute;
  width: 60%;
  height: 45%;
  top: 45%;
  left: 10%;
}
.gif .card01 p {
  text-align: left;
  box-sizing: inherit;
  width: 100%;
  word-break: break-all;
  font-size: 3vw;
}
</style>
