<template>
  <div class="api">
    <input v-model="title.title">
    <button @click="postApi">api書き込み</button>
    <div class="list">
      <ul>
        <li v-for="(post,number) in data" :key="number" @click="openModal(post)">{{post.id}} : {{post.title}}
        </li>
      </ul>
      <Modal ref="mdl" @update="getApi"/>
    </div>
  </div>
</template>

<script>
import Modal from "./APImodal.vue"
export default {
  data () {
    return {
      title: { 
        title:"",
        shape: "01",
        uid: "",
        share: "all"
        },
      data: [],
      api_url: ""
    }
  },
  components: {
    Modal
  },
  methods: {
    getApi (){
      this.axios.get(this.api_url+'index')
      .then((response) => {
        this.data = response.data.data
        console.log(this.data)
      })
    },
    postApi () {
      const data = {
        title: this.title.title,
        shape: "fsdf",
        uid: this.$store.state.user.uid,
        share: "all"
      }
      console.log(data)
      this.axios.post(this.api_url+'create',data)
      .then((response) => {
        console.log(response)
        this.title.title=""
        this.getApi()
      })
    },
    openModal (post) {
      console.log(post.title)
      this.$refs.mdl.isOpen = true;
      this.$refs.mdl.title.title = post.title;
      this.$refs.mdl.id = post.id;
    } 
  },
  mounted: function (){
    this.api_url = process.env.VUE_APP_RAILS_API_POSTS
    this.getApi()
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
