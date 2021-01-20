<template>
  <div v-show="get_form.gif!=''">
    <h3>メッセージの配置を指定してください</h3>
    <div class="position">
      <video :src="get_video" ref="video" id="setpos"></video>
      <vue-draggable-resizable
        :x="0"
        :y="0"
        :w="100" 
        :h="50" 
        :parent="true"
        @dragging="onDrag" 
        @resizing="onResize" 
        class="drag"
        >
        <div class="custom" :style="font">
          <nl2br class="nl2br" tag="div" :text="get_form.text"/>
        </div>
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'
import Nl2br from 'vue-nl2br'

export default {
  data() {
    return {
      open: false,
      pos:{
        top: 0,
        left: 0,
        height: 33,
        width: 33,
        select: false
      },
      video:{
        height: 0,
        width: 0
      },
      drag: {
        width: 100,
        height: 100,
        x: 0,
        y: 0
      },
      font:{
        fontSize: "20px"
      }
    }
  },
  methods: {
    setTH(){
      this.pos={
        top: (this.drag.y/this.video.height)*100,
        left: (this.drag.x/this.video.width)*100,
        width: (this.drag.width/this.video.width)*100,
        height: (this.drag.height/this.video.height)*100,
        select: true
      }
      console.log(this.pos)
      this.$store.dispatch("setPosition",this.pos)
    },
    setVideo(){
      const width = document.getElementById('setpos').clientWidth
      const height = document.getElementById('setpos').clientHeight
      this.video.width = width
      this.video.height = height
      this.font = {
      fontSize: width*0.03+'px'
      }
      this.setTH()
    },
    onResize: function (x, y, width, height) {
      this.drag.x = x
      this.drag.y = y
      this.drag.width = width
      this.drag.height = height
      this.setTH()
      this.setVideo()
    },
    onDrag: function (x, y) {
      this.drag.x = x
      this.drag.y = y
      this.setTH()
      this.setVideo()
    }
  },
  computed:{
    get_form() {
      return  this.$store.getters.get_form
    },
    get_position(){
      return this.$store.getters.get_position

    },
    get_video() {
      return  "/Video/"+this.get_form.gif +".mp4"
    },
  },
  mounted(){
    this.setVideo()
    window.addEventListener('resize', this.setVideo)
  },
  watch:{
    get_video(){
      this.setVideo()
    },
  },
  components:{
    VueDraggableResizable,
    Nl2br
  }
}
</script>

<style scoped>
.position {
  position: relative;
  width: 60%;
  margin: auto;
  display: flex;
  /* justify-content: center;
  align-items: center; */
  margin-bottom: 15px;
  border: 5px solid white;
}
video{
  width:100%;
  height: 100%;
  top: 0;
}
.move {
  position: absolute;
  top: 0;
  left:0;
  width: 33%;
  height: 33%;
  background-color: rgba(32, 34, 36, 0.486);
}
.drag {
  cursor: move;
}
.custom div {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.custom {
  text-align: left;
  box-sizing: inherit;
  word-break: break-all;
  font-weight: 700;
}
</style>
