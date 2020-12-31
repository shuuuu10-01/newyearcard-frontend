<template>
  <div class="index">
    <h1>作った年賀状</h1>
    <div class="card">
      <span v-for="card in cards" :key="card.num" @click="$router.push('/card/'+card.public_uid+'/edit')">
        <p>{{card.share}}:{{card.updated_at}}</p>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards:[]
    }
  },
  methods:{
    set_card(){
      return this.axios.get(this.get_api_rails+this.uid+'/where')
      .then((response)=>{
        let share= ""
        for(let i = 0; i<response.data.data.length;i++){
          if(response.data.data[i].share==0){
            share = "全体公開"
          }else if(response.data.data[i].share==1){
            share = "フォロワー限定"
          }else{
            share = "@"+response.data.data[i].DM_id+"さんへ"
          }
          let data = { 
            share: share,
            public_uid: response.data.data[i].public_uid,
            updated_at: response.data.data[i].updated_at.substr( 0, 10 )
          }
          this.cards.push(data)
        }
      })
    }
  },
  computed: {
    get_api_rails() {
      return this.$store.getters.get_API_URL
    },
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
}
span {
  line-height: 30px;
  width: 300px;
  margin: auto;
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
span:hover{
  background:rgba(172, 172, 172,0.2);
}
p{
  font-size: 17px;
}
</style>
