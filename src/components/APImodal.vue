<template>
  <div v-show="isOpen" id="overlay">
    <div id="content">
      <input v-model="title.title">
      <button @click="updateApi">更新</button>
      <button @click="deleteApi">削除</button>
    </div>
    <div id="modal_bg" v-show="isOpen" @click="isOpen = false"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: {
        title: ""
      },
      isOpen: false,
      id: "",
      api_url: ""
    }
  },
  methods: {
    updateApi () {
      this.axios.post(this.api_url+this.id+'/update', this.title)
      .then((response) => {
        console.log(response)
        this.$emit("update");
        this.isOpen = false
      })
    },
    deleteApi () {
      this.axios.post(this.api_url+this.id+'/destroy')
      .then((response) => {
        console.log(response)
        this.$emit("update");
        this.isOpen = false
      })
    }
  },
  mounted: function (){
    this.api_url = process.env.VUE_APP_RAILS_API_POSTS
  }
}
</script>

<style scoped>
#overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

#modal_bg {
  position: absolute;
  width: 100%;
  height: 100%;
}

#content {
  z-index: 2;
  width: 50%;
  padding-top: 5em;
  padding-bottom: 5em;
  text-align: center;
  background-color: white;
}
</style>
