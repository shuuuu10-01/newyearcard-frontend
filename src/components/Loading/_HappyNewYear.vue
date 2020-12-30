<template>
  <div class="welcome" v-show="start">
      <h1 class="ml2">
        <span class="letter colorRed">H</span>
        <span class="letter colorRed">a</span>
        <span class="letter colorRed">p</span>
        <span class="letter colorRed">p</span>
        <span class="letter colorRed">y</span>
        <span class="letter colorRed">N</span>
        <span class="letter colorRed">e</span>
        <span class="letter colorRed">w</span>
        <span class="letter colorRed">Y</span>
        <span class="letter colorRed">e</span>
        <span class="letter colorRed">a</span>
        <span class="letter colorRed">r</span>
        <!-- <span class="letter">2</span>
        <span class="letter">0</span>
        <span class="letter">2</span>
        <span class="letter">1</span>  -->
      </h1>
      <h1 class="ml4">
        <span class="letters letters-1">3</span>
        <span class="letters letters-2">2</span>
        <span class="letters letters-3">1</span>
      </h1>
    </div>
</template>

<script>
import anime from 'animejs'
var ml4 = {};
ml4.opacityIn = [0,1];
ml4.scaleIn = [0.2, 1];
ml4.scaleOut = 3;
ml4.durationIn = 800;
ml4.durationOut = 600;
ml4.delay = 500;

export default {
  data() {
    return {
      start: true
    }
  },
  methods: {
    welcomeAnime(){
      let animation = anime.timeline()
      .add({
        targets: '.ml4 .letters-1',
        opacity: ml4.opacityIn,
        scale: ml4.scaleIn,
        duration: ml4.durationIn
      }).add({
        targets: '.ml4 .letters-1',
        opacity: 0,
        scale: ml4.scaleOut,
        duration: ml4.durationOut,
        easing: "easeInExpo",
        delay: ml4.delay
      }).add({
        targets: '.ml4 .letters-2',
        opacity: ml4.opacityIn,
        scale: ml4.scaleIn,
        duration: ml4.durationIn
      }).add({
        targets: '.ml4 .letters-2',
        opacity: 0,
        scale: ml4.scaleOut,
        duration: ml4.durationOut,
        easing: "easeInExpo",
        delay: ml4.delay
      }).add({
        targets: '.ml4 .letters-3',
        opacity: ml4.opacityIn,
        scale: ml4.scaleIn,
        duration: ml4.durationIn
      }).add({
        targets: '.ml4 .letters-3',
        opacity: 0,
        scale: ml4.scaleOut,
        duration: ml4.durationOut,
        easing: "easeInExpo",
        delay: ml4.delay
      }).add({
        targets: '.ml4',
        opacity: 0,
        duration: 500,
        delay: 500
      }).add({
        targets: '.ml2 .letter',
        scale: [4,1],
        opacity: [0,1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 950,
        delay: (el, i) => 70*i
      }).add({
        targets: '.ml2',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
      })
      animation.finished.then(()=>{
        this.start= false
      })
    },
    async doAnime() {
      this.welcomeAnime()
    }
  },
  mounted(){
    this.doAnime()
  }
}
</script>

<style scoped>
.welcome{
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  /* display: flex; */
  align-items: center;
  justify-content: center;
  display: flex;
}
.ml2 {
  z-index: 3;
  font-weight: 900;
  font-size: 3.5em;
}
.ml2 .letter {
  display: inline-block;
  line-height: 1em;
}
.ml4 {
  position: absolute;
  font-weight: 900;
  font-size: 4.5em;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
}
.ml4 span{
  
}
.ml4 .letters {
  position: absolute;
  margin: auto;
  text-align: center;
  opacity: 0;
  font-size: 20vw;
}
.colorRed{
  color: rgba(218, 35, 22, 0.85);
}
</style>
