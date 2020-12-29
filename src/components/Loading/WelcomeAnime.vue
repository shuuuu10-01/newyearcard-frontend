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
