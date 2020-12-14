<template>
  <div>
    <div class="card" v-if="isShow">
      <Gif :_gif="card.gif" :_text="card.text"/>
    </div>
  </div>
</template>

<script>
import Gif from '../../components/Gif/__Gif.vue'
export default {
  data () {
    return {
      api_url: '',
      words: [],
      card: {
        text:"",
        gif:"",
      },
      isShow: false
    }
  },
  components: {
    Gif
  },
  methods: {
    showApi () {
      this.axios.get(this.api_url+this.$route.params.id+'/show', this.title)
      .then((response) => {
        console.log(response)
        this.card.text = response.data.data.text
        this.card.gif = response.data.data.gif
        this.isShow = true
        console.log(this.card.gif)
      })
    },
  },
  mounted: function() {
    this.api_url = process.env.VUE_APP_RAILS_API_POSTS
    this.showApi()
  }
}
</script>

<style scoped>

</style>
