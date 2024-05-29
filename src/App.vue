<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template
  style="
    margin: 0;
    height: 100%;
    background-image: url('/src/assets/image/background.png');
    background-size: cover;
  "
>
  <div :class="$style['container']">
    <RouterView />
  </div>
</template>

<style module>
.container {
  margin: auto;
  align-items: center;
  width: 800px;
  height: 600px;
  background-color: aquamarine;
}

@media screen and (max-width: 700px) {
  .container {
    margin: auto;
    align-items: center;
    width: 400px;
    height: 300px;
    background-color: aquamarine;
  }
}
</style>
