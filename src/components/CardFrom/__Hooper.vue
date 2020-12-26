<template>
  <div key="flickity">
    <hooper
      class="hooper-sample__hooper"
      :settings="hooperSettings"
      >
      <slide>
        <video src="/Video/card01.mp4" loop autoplay muted/>
        <label class="gif-radio"><input type="radio" name="gif-radio" class="gif-radio" value="card01" @input="setGif($event.target.value)">年賀状01</label>
      </slide>
      <slide>
        <video src="/Video/card02.mp4" loop autoplay muted/>
        <label class="gif-radio"><input type="radio" name="gif-radio" class="gif-radio" value="card02" @input="setGif($event.target.value)">年賀状02</label>
      </slide>
      <slide>
        <video src="/Video/card03.mp4" loop autoplay muted/>
        <label class="gif-radio"><input type="radio" name="gif-radio" class="gif-radio" value="card03" @input="setGif($event.target.value)">年賀状03</label>
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
video{
  width: 100%;
}
</style>
