<template>
  <div class="welcome" @click="doAnime">
      <happy-new-year/>
    </div>
</template>

<script>
import HappyNewYear from './_HappyNewYear.vue';
export default {
  components: { HappyNewYear },
}
</script>

<style scoped>
.welcome{
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(226, 219, 219);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
