<template>
  <div v-show="get_form!=''">
    <h3>メッセージの配置を指定してください</h3>
    <div class="position">
      <video :src="get_video"></video>
      <div v-for="button in buttons" :key="button.num">
        <input type="checkbox" :id="button.name" :value="button.value" v-model="positions"/>
        <label :for="button.name" :class="button.name"></label>
      </div>
      <button @click="setPosition()">kakuti</button>
    </div>
    <button @click="check()">check</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      positions:[],
      buttons: [
        {
          name:"tl-00",
          value:"00"
        },
        {
          name:"tl-01",
          value:"01"
        },
        {
          name:"tl-02",
          value:"02"
        },
        {
          name:"tl-10",
          value:"10"
        },
        {
          name:"tl-11",
          value:"11"
        },
        {
          name:"tl-12",
          value:"12"
        },
        {
          name:"tl-20",
          value:"20"
        },
        {
          name:"tl-21",
          value:"21"
        },
        {
          name:"tl-22",
          value:"22"
        },
      ],
      pos:{
        top: '',
        left: '',
        height: '',
        width: '',
        select: false
      }
    }
  },
  methods: {
    setPosition(){
      //選択した部分が適切かの判定とその後の処理
      let f = function (a, b) {
        return a - b
      }
      const array= this.positions
      const pos = array.sort(f)
      if(pos.length==1){
        const t = parseInt(pos[0]/10)
        const l = pos[0]%10
        console.log(t,l)
        this.setTH(t,l,1,1)
      }
    },
    setTH(t,l,h,w){
      if(h==0){
        this.pos.select = false
      }else {
        this.pos.select = true
      }
      this.pos.top = t*32 + 2
      this.pos.left = l*32 + 2
      this.pos.height = h*30
      this.pos.width = w*30,
      this.$store.dispatch("setPosition",this.pos)
    },
    check(){
      console.log(this.$store.state)
    }
  },
  computed:{
    get_form() {
      return  this.$store.getters.get_form.gif
    },
    get_video() {
      return  "/Video/"+this.get_form +".mp4"
    },
  },
  // watch: {
  //   positions(){
  //     //選択した部分が四角かどうかの判定とその後の処理
  //     this.setPosition()
  //   }
  // }
}
</script>

<style scoped>
.position {
  position: relative;
  width: 60%;
  margin: auto;
  display: flex;
  margin-bottom: 15px;
}
video{
  width:100%;
}
.position input[type="checkbox"]{
  display: none;
}
input[type="checkbox"]+label{
  position: absolute;
  width: 33.33%;
  height: 33.33%;
  cursor: pointer;
	text-decoration: none;
	color:  #55acee;
	z-index: 1;
  display: flex;
}
input[type="checkbox"]+label::before{
  content: "";
  position: absolute;
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 1px solid;
  border: 1px solid white;
}

label.tl-00{
  top: 0;
  left: 0;
}
label.tl-01{
  top: 0;
  left: 33.3%;
}
label.tl-02{
  top: 0;
  left: 66.6%;
}

label.tl-10{
  top: 33.3%;
  left: 0;
}
label.tl-11{
  top: 33.3%;
  left: 33.3%;
}
label.tl-12{
  top: 33.3%;
  left: 66.6%;
}

label.tl-20{
  top: 66.63%;
  left: 0;
}
label.tl-21{
  top: 66.63%;
  left: 33.3%;
}
label.tl-22{
  top: 66.63%;
  left: 66.6%;
}
input[type="checkbox"]:checked+label::after{
  content: "";
  position: absolute;
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #f148487a;
  /* border: 1px solid  #f14848; */
}
</style>
