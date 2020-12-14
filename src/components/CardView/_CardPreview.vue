<template>
  <div class="card-view">
    <input v-model="title">
    <button @click="titleAnime">animation</button>
    <h1 class="ml6">
      <span class="text-wrapper">
          <span class="letter" v-for="(word,number) in words" :key="number" v-html="word">
          </span>
        </span>
    </h1>
  </div>
</template>

<script>
import anime from 'animejs'
export default {
  data () {
    return {
      title: '',
      words: []
    }
  },
  methods: {
    timeline1 () {
      anime.timeline({ loop: false })
        .add({
          targets: '.ml6 .letter',
          translateY: ['1.3em', 0],
          translateZ: 0,
          duration: 800,
          delay: (el, i) => 50 * i
        })
    },
    titleAnime () {
      // 文字列を一文字ずつ配列に入れ込む
      this.words = this.title.split('')
      // 文字列に空白がある場合に&nbsp;を入れることで空白がなくなるのを防ぐ
      var index = true
      while (index !== false) {
        index = this.words.findIndex(item => item === ' ')
        if (index !== -1) {
          this.words[index] = '&nbsp;'
        } else {
          index = false
        }
      }
      // アニメの実行
      this.timeline1()
    }
  }
}
</script>

<style scoped>
#lineDrawing {
    margin: 40px auto 0;
}
.ml6 {
  position: relative;
  font-weight: 900;
  font-size: 3.3em;
}
.ml6 .text-wrapper {
  position: relative;
  display: inline-block;
  padding-top: 0.1em;
  padding-right: 0.05em;
  padding-bottom: 0.1em;
  overflow: hidden;
}
.ml6 .letter {
  display: inline-block;
  line-height: 1em;
}
</style>
