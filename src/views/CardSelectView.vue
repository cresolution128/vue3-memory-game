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
      background-image: url('/assets/image/background.jpg');
      background-size: cover;
    "
  >
    <div style="display: flex; width: 100%; flex-direction: row; align-items: center">
      <div style="flex-grow: 1; height: 100%">
        <img src="/assets/image/selectcard.png" style="width: 100%; height: 80%" />
      </div>
      <img
        src="/assets/image/home.png"
        style="cursor: pointer; margin-top: -50px; max-width: 100px"
        @click="navigateBack()"
        class="back-icon"
      />
    </div>
    <div :class="$style['list-container']">
      <div
        :class="$style['number-button']"
        style="background-image: url('/assets/image/button.png')"
        @click="navigate(2)"
      >
        2
      </div>
      <div
        :class="$style['number-button']"
        style="background-image: url('/assets/image/button.png')"
        @click="navigate(4)"
      >
        4
      </div>
      <div
        :class="$style['number-button']"
        @click="navigate(6)"
        style="background-image: url('/assets/image/button.png')"
      >
        6
      </div>
      <div
        :class="$style['number-button']"
        @click="navigate(9)"
        style="background-image: url('/assets/image/button.png')"
      >
        9
      </div>
      <div
        :class="$style['number-button']"
        @click="navigate(12)"
        style="background-image: url('/assets/image/button.png')"
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
  max-height: 100px;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  color: white;
  font-family: cursive;
  cursor: pointer;
}
.list-container {
  padding: 20px;
  display: flex;
  grid-template-columns: 1 2 2 1;
}
.back-icon {
  width: 100px;
  height: 100px;
}
@media screen and (max-width: 700px) {
  .number-button {
    font-size: 20px;
  }
  .back-icon {
    width: 50px;
    height: 50px;
  }
}
</style>
