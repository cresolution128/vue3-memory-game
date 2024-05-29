<script lang="ts">
export default {
  name: 'HomeView',
  methods: {
    navigate() {
      this.$router.replace({ name: 'card-select' })
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
    <div>
      <img src="/src/assets/image/title.png" style="width: 100%; height: 80%" />
    </div>
    <div :class="$style['container']">
      <div
        :class="$style['number-button']"
        style="
          grid-column: 1/3;
          display: grid;
          flex-direction: row;
          padding-left: 20px;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
          height: 80%;
        "
      >
        <img
          src="/src/assets/image/1.jpg"
          style="
            width: 150%;
            height: 100%;
            border-radius: 10px;
            background-size: 100% 100%;
            border: 0;
            transform: rotateZ(10deg);
          "
        />
        <img
          src="/src/assets/image/2.jpg"
          style="
            width: 150%;
            height: 100%;
            border-radius: 10px;
            background-size: 100% 100%;
            border: 0;
            transform: rotateZ(6deg);
          "
        />
        <img
          src="/src/assets/image/3.jpg"
          style="
            width: 150%;
            height: 100%;
            border-radius: 10px;
            background-size: 100% 100%;
            border: 0;
            transform: rotateZ(-10deg);
          "
        />
        <img
          src="/src/assets/image/4.jpg"
          style="
            width: 150%;
            height: 100%;
            border-radius: 10px;
            background-size: 100% 100%;
            border: 0;
            transform: rotateZ(10deg);
          "
        /><img
          src="/src/assets/image/5.jpg"
          style="
            width: 150%;
            height: 100%;
            border-radius: 10px;
            background-size: 100% 100%;
            border: 0;
            transform: rotateZ(-5deg);
          "
        />
        <img
          src="/src/assets/image/6.png"
          style="
            width: 150%;
            height: 100%;
            border-radius: 10px;
            background-size: 100% 100%;
            border: 0;
            transform: rotateZ(10deg);
          "
        />
      </div>
      <div :class="$style['number-button']">
        <div
          :class="$style['start-button']"
          style="background-image: url('/src/assets/image/play.png'); background-color: transparent"
          @click="navigate()"
        ></div>
      </div>
    </div>
  </div>

  <div style=""></div>
</template>
<style module>
.container {
  display: grid;
  grid-template-columns: repeat(3, minmax(0px, 200px));
  grid-template-rows: 1 1;
  column-gap: 100px;
  row-gap: 100px;
  padding: 50px;
  justify-content: center;
  align-items: center;
}
.number-button {
  margin: auto;
  display: flex;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
}
.start-button {
  margin: auto;
  display: flex;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  cursor: pointer;
}

@media screen and (max-width: 700px) {
  .start-button {
    margin: auto;
    display: flex;
    width: 50%;
    height: 50%;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    justify-content: center;
    align-items: center;
    min-width: 100px;
  }
  .container {
    padding: 25px;
  }
}
</style>
