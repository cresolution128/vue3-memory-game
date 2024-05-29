<script lang="ts">
import confetti from 'canvas-confetti'
interface Card {
  id: number
  content: string
  isPairFound: boolean
}

interface Data {
  cardList: any[]
  cardsInfo: string[]
  cards: Card[]
  flippedList: any[]
  temp: Card[]
  cardNum: number
  endState: boolean
}
export default {
  name: 'RoomView',
  data(): Data {
    return {
      cardList: [],
      cardsInfo: [
        '/src/assets/image/1.jpg',
        '/src/assets/image/2.jpg',
        '/src/assets/image/3.jpg',
        '/src/assets/image/4.jpg',
        '/src/assets/image/5.jpg',
        '/src/assets/image/6.png',
        '/src/assets/image/7.jpg',
        '/src/assets/image/8.jpg',
        '/src/assets/image/9.jpg',
        '/src/assets/image/10.jpg',
        '/src/assets/image/11.jpg',
        '/src/assets/image/12.jpg'
      ],
      cards: [],
      temp: [],
      flippedList: [],
      cardNum: 2,
      endState: false
    }
  },
  methods: {
    launchConfetti() {
      const myConfetti = confetti.create(this.$refs.confettiCanvas, {
        resize: true,
        useWorker: true
      })

      myConfetti({
        particleCount: 1000,
        spread: 170,
        origin: { y: 0.6 }
      })
    },
    navigateBack() {
      this.$router.replace({ name: 'home' })
    },
    gridMake(num: number) {
      switch (num) {
        case 2:
          return '1fr 1fr'
        case 4:
          return '1fr 1fr 1fr 1fr'
        case 6:
          return '1fr 1fr 1fr 1fr'
        case 9:
          return '1fr 1fr 1fr 1fr 1fr 1fr'
        case 12:
          return '1fr 1fr 1fr 1fr 1fr 1fr'
      }
    },
    shuffle(cards: Card[]) {
      return cards.sort(() => Math.random() - 0.5)
    },
    handleClick(card: Card) {
      if (this.temp.length === 0) {
        if (card.isPairFound) return
        this.temp.push(card)
      } else if (this.temp.length === 1) {
        if (this.temp[0].id === card.id || card.isPairFound) return
        this.temp.push(card)
        if (this.temp[0].content === this.temp[1].content) {
          this.setPairFound(this.temp[0])
          this.setPairFound(this.temp[1])
          if (this.checkAllPaired()) {
            this.endState = true
            this.launchConfetti()
            setTimeout(() => {
              this.restart()
            }, 3000)
          }
        }
        setTimeout(() => {
          this.temp = []
        }, 700)
      }
    },
    setPairFound(card: Card) {
      this.cardList = this.cardList.map((item) => {
        if (item.id === card.id) {
          return {
            ...item,
            isPairFound: true
          }
        } else return item
      })
    },
    checkFlipped(card: Card) {
      if (this.temp.some((item) => item.id === card.id) || card.isPairFound === true) {
        return 'flipped'
      }
    },
    checkPaired(card: Card) {
      if (card.isPairFound) {
        return 'paired'
      }
    },
    checkAllPaired() {
      if (this.cardList.every((item) => item.isPairFound === true)) return true
      else return false
    },
    restart() {
      this.endState = false
      this.cardList = this.cardList.map((item) => {
        return {
          ...item,
          isPairFound: false
        }
      })
      this.temp = []
      setTimeout(() => {
        this.cardList = this.shuffle(this.cardList)
      }, 1000)
    }
  },
  computed: {
    playerNum() {
      return this.$route.params.number
    }
  },
  mounted() {
    const param = this.$route.params.number
    this.cardNum = parseInt(param.toString())
    let stringNumberedCards = this.cardsInfo.slice(0, this.cardNum)

    let numberedCards = stringNumberedCards.map((item, index) => {
      return { id: index, content: item, isPairFound: false }
    })

    this.cards = numberedCards.concat(
      numberedCards.slice().map((item, index) => {
        return {
          id: numberedCards.length + index,
          content: item.content,
          isPairFound: false
        }
      })
    )
    this.cardList = this.shuffle(this.cards)
  }
}
</script>

<template>
  <div
    style="
      height: 100%;
      display: flex;
      flex-direction: column;
      background-image: url('/src/assets/image/background.png');
      background-size: cover;
    "
  >
    <canvas
      ref="confettiCanvas"
      style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none"
    ></canvas>
    <div
      style="
        width: 80%;
        height: 80%;
        z-index: 1000;
        background-image: url('/src/assets/image/congratulation.png');
        background-size: 100% 100%;
        animation: anim 0.4s ease-in-out forwards;
        margin: auto;
      "
      :style="{
        display: endState ? 'block' : 'none',
        opacity: endState ? 1 : 0
      }"
    ></div>
    <div
      style="height: 100px; flex-direction: row"
      :style="{ display: endState ? 'none' : 'flex' }"
    >
      <img src="/src/assets/image/title.png" style="flex-grow: 1; height: 100%" />
      <img
        src="/src/assets/image/home.png"
        style="cursor: pointer"
        @click="navigateBack()"
        class="back-icon"
      />
    </div>
    <div :class="['container']" :style="{ gridTemplateColumns: `${gridMake(cardNum)}` }">
      <div
        v-for="(card, index) in cardList"
        :class="['card', checkFlipped(card), checkPaired(card)]"
        :key="index"
        @click="handleClick(card)"
      >
        <div :class="['front']"></div>
        <div class="back" :style="{ backgroundImage: `url(${card.content})` }"></div>
      </div>
    </div>
  </div>

  <div style=""></div>
</template>
<style>
.card {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  aspect-ratio: 0.7;
  max-height: 300px;
  cursor: pointer;
}

.paired {
  opacity: 70%;
}
.front {
  background-image: url('/src/assets/image/question.jpg');
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  background-color: green;
  transform: rotateY(0deg);
  backface-visibility: hidden;
  transition: transform 0.8s;
  border-radius: 10px;
}
.back {
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  background-color: red;
  transform: rotateY(-180deg);
  backface-visibility: hidden;
  transition: transform 0.8s;
  border-radius: 10px;
}
.flipped .front {
  transform: rotateY(180deg);
}
.flipped .back {
  transform: rotateY(0deg);
}
.container {
  margin: auto;
  max-width: 800px;
  display: grid;
  flex-grow: 1;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 50px;
  column-gap: 10px;
  row-gap: 10px;
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
  width: 50%;
  height: 50%;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  min-width: 200px;
}
.back-icon {
  width: 100px;
  height: 100px;
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
    column-gap: 3px;
    row-gap: 3px;
  }
  .back-icon {
    width: 50px;
    height: 50px;
  }
}
@keyframes anim {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  20% {
    opacity: 0.25;
    transform: scale(0.7);
  }
  40% {
    opacity: 0.5;
    transform: scale(0.9);
  }
  60% {
    opacity: 0.75;
    transform: scale(1);
  }
  80% {
    opacity: 1;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
