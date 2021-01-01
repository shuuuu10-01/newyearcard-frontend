<template>
  <div class="icon icon--plus">
    <span class="icon__mark" @click="$router.push('/card/new')"><i class="fas fa-edit"></i></span>
  </div>
</template>

<style scoped>
.icon {
  z-index: 5;
  position: fixed;
  right: 10px;
  bottom: 60px;
  width: 70px;
  height: 70px;
  background:white;
  border: 2px solid #abbdc4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 0 rgba(255,255,255,0.2), 0 2px 2px rgba(0, 0, 0, 0.19);
  cursor: pointer;
}
.icon:hover{
  background: #ccc;
}
i{
  line-height: 55px;
  color: #484f52;
  font-size: 30px;
}
</style>
