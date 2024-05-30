<script lang="ts">
export default {
  name: 'CardSelectView',
  methods: {
    navigate(num: number) {
      this.$router.replace({ name: 'room', params: { number: num } })
    },
    navigateBack() {
      this.$router.replace({ name: 'home' })
    }
  }
}
</script>

<template>
  <div
    style="
      display: grid;
      grid-template-rows: 1 1;
      height: 100%;
      background-image: url('/src/assets/image/background.png');
      background-size: cover;
    "
  >
    <div style="display: flex; width: 100%; flex-direction: row; align-items: center">
      <div style="flex-grow: 1; height: 100%">
        <img src="/src/assets/image/selectcard.png" style="width: 100%; height: 80%" />
      </div>
      <!-- <div style="width: 150px; height: 100px; justify-content: center"> -->
      <img
        src="/src/assets/image/home.png"
        style="cursor: pointer; width: 100px; height: 100px"
        @click="navigateBack()"
        class="back-icon"
      />
      <!-- </div> -->
      <!-- <img src="/src/assets/image/selectcard.png" style="flex-grow: 1" />
      <div style="justify-content: center">
        <img
          src="/src/assets/image/home.png"
          style="cursor: pointer; width: 100px; height: 100px"
          @click="navigateBack()"
          class="back-icon"
        />
      </div> -->
    </div>
    <div :class="$style['list-container']">
      <div
        :class="$style['number-button']"
        style="background-image: url('/src/assets/image/button.png')"
        @click="navigate(2)"
      >
        2
      </div>
      <div
        :class="$style['number-button']"
        style="background-image: url('/src/assets/image/button.png')"
        @click="navigate(4)"
      >
        4
      </div>
      <div
        :class="$style['number-button']"
        @click="navigate(6)"
        style="background-image: url('/src/assets/image/button.png')"
      >
        6
      </div>
      <div
        :class="$style['number-button']"
        @click="navigate(9)"
        style="background-image: url('/src/assets/image/button.png')"
      >
        9
      </div>
      <div
        :class="$style['number-button']"
        @click="navigate(12)"
        style="background-image: url('/src/assets/image/button.png')"
      >
        12
      </div>
    </div>
  </div>

  <div style=""></div>
</template>
<style module>
.number-button {
  margin: auto;
  display: flex;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-position: center; /* Center the image within the div */
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: white;
  font-family: cursive;
  cursor: pointer;
}
.list-container {
  display: flex;
  grid-template-columns: 1 2 2 1;
}
</style>
