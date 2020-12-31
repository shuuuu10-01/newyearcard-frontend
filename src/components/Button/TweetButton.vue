<template>
  <div>
    <a :href="set_url"><i class="fab fa-twitter"></i> ツイート</a>
  </div>
</template>

<script>
export default {
  computed:{
    set_url() {
      const href="https://twitter.com/intent/tweet?text="
      const path= "https://newyearmaker.netlify.app"+this.$route.path
      const Path =  encodeURI(path)
      const text ="年賀状をWebアプリで作ってみた"
      const Text = encodeURI(text)
      console.log(Path)
      return href +Text+"%0a"+Path
    }
  }
}
</script>

<style scoped>
a {
  position: relative;
  background-color: #55acee;
  font-weight: 500;
  padding: 1px 8px 1px 6px;
  cursor: pointer;
  border: 2px solid #55acee;
  border-radius: 3px;
  color: white;
  line-height: 30px;
  font-size: 12px;
  text-decoration: none;
}
a:hover {
  background-color:  #4791c9;
}
</style>
