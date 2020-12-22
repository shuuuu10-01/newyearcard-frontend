<template>
  <div key="flickity">
    <hooper
      class="hooper-sample__hooper"
      :settings="hooperSettings"
      >
      <slide>
        <gif _src="/Gif/card01.gif"/>
        <label class="gif-radio"><input type="radio" class="gif-radio" name="gif" value="card01" @input="setGif($event.target.value)">年賀状01</label>
      </slide>
      <slide>
        <gif _src="/Gif/card02.gif"/>
        <label class="gif-radio"><input type="radio" class="gif-radio" name="gif" value="card02" @input="setGif($event.target.value)">年賀状02</label>
      </slide>
      <slide>
        <gif _src="/Gif/card03.gif"/>
        <label class="gif-radio"><input type="radio" name="gif-radio" value="card03" @input="setGif($event.target.value)">年賀状03</label>
      </slide>
      <slide>
        <gif _src="/Gif/card04.gif"/>
        <label class="gif-radio"><input type="radio" name="gif-radio" value="card04" @input="setGif($event.target.value)">年賀状04</label>
      </slide>
      <br>
      <hooper-pagination slot="hooper-addons"/>
      <hooper-navigation slot="hooper-addons"></hooper-navigation>
    </hooper>
  </div>
</template>

<script>
import { 
  Hooper, 
  Slide, 
  Pagination as HooperPagination,
  Navigation as HooperNavigation 
} from 'hooper';
import 'hooper/dist/hooper.css';
import Gif from './__Gif.vue'

export default {
  data() {
    return {
      hooperSettings: {
        itemsToShow: 1,
        wheelControl: false,
        touchDrag: true,
        infiniteScroll: true,
        centerMode: true
      },
    }
  },
  components: {
    Hooper,
    Slide,
    HooperPagination,
    HooperNavigation,
    Gif
  },
  methods: {
    setGif(value) {
      this.$store.dispatch("setGif",value)
    }
  }
}
</script>

<style scoped>
.gif-radio {
  cursor: pointer;
}
/* Hooper */
.hooper-sample__hooper{
  cursor:grab;
}
.hooper-sample__hooper:active{
  cursor:grabbing;
}
.hooper {
  height: 100%;
  width: 90%;
  margin: auto;
  padding-top: 10px;
}
.hooper-navigation{
  margin-top: 30px;
}
</style>
