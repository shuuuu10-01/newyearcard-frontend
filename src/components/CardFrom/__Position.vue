<template>
  <div v-show="get_form!=''">
    <h3>メッセージの配置を指定してください</h3>
    <div class="position">
      <video :src="get_video"></video>
      <input type="checkbox" id="tl-00"/>
      <label for="tl-00" class="tl-00"></label>
      <input type="checkbox" id="tl-01"/>
      <label for="tl-01" class="tl-01"></label>
      <input type="checkbox" id="tl-02"/>
      <label for="tl-02" class="tl-02"></label>


      <input type="checkbox" id="tl-10"/>
      <label for="tl-10" class="tl-10"></label>
      <input type="checkbox" id="tl-11"/>
      <label for="tl-11" class="tl-11"></label>
      <input type="checkbox" id="tl-12"/>
      <label for="tl-12" class="tl-12"></label>


      <input type="checkbox" id="tl-20"/>
      <label for="tl-20" class="tl-20"></label>
      <input type="checkbox" id="tl-21"/>
      <label for="tl-21" class="tl-21"></label>
      <input type="checkbox" id="tl-22"/>
      <label for="tl-22" class="tl-22"></label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false
    }
  },
  computed:{
    get_form() {
      return  this.$store.getters.get_form.gif
    },
    get_video() {
      return  "/Video/"+this.get_form +".mp4"
    }
  },
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
	z-index: 1000;
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
