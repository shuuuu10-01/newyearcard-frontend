<template>
  <div class="index">
    <h1>受け取った年賀状</h1>
    <loader :loading="loader"/>
    <div class="card">
      <span v-for="card in cards" :key="card.num" @click="$router.push('/card/'+card.public_uid+'/show')">
        <p>{{card.display_name}} より</p>
      </span>
    </div>
  </div>
</template>

<script>
import Loader from '../Loading/Loader.vue'
export default {
  components: { Loader },
  data() {
    return {
      cards:[],
      loader: true
    }
  },
  methods:{
    set_card(){
      return this.axios.get(this.get_recieve+this.uid+'/where')
      .then((response)=>{
        for(let i = 0; i<response.data.data.length;i++){
          let data = { 
            display_name: response.data.data[i].display_name,
            public_uid: response.data.data[i].public_uid,
            updated_at: response.data.data[i].updated_at.substr( 0, 10 )
          }
          this.cards.push(data)
        }
        this.loader=false
      })
    }
  },
  computed: {
    get_recieve(){
      return this.$store.getters.get_API_RECIEVE
    }
  },
  props:{
    uid: String
  },
  watch: {
    uid(){
      this.set_card()
    }
  },
  mounted(){
    this.set_card()
  }
}
</script>

<style scoped>
.index{
  margin-bottom: 30px;
}
.index h1{
  margin: auto;
  margin-top: 20px;
  font-size: 25px;
}
.card{
  display: flex;
  flex-wrap :wrap;
  align-items: center;
  justify-content: center;
}
span {
  line-height: 30px;
  width: 250px;
  margin: 5px;
  margin-top: 10px;
  cursor: pointer;
	display: block;
	text-align: center;
	text-decoration: none;
	color:  #abbdc4;
	background:#FFF;
	border-radius: 4px;
  border: 2px solid#abbdc4;
	box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), 0 2px 2px rgba(0, 0, 0, 0.19);
}
span:active {
	border-bottom: 2px solid #abbdc4;
	box-shadow: 0 0 2px rgba(0, 0, 0, 0.30);
}
span:hover {
  color:  rgba(214, 75, 11);
  border: 2px solid rgba(214, 75, 11);
  background:rgba(214, 75, 11,0.2);
}
p{
  font-size: 17px;
}
</style>
