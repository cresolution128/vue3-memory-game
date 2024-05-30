<script lang="ts">
import confetti from 'canvas-confetti'
import { useTimerStore } from '../stores/timer'
import { mapActions, mapState, mapStores } from 'pinia'
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
  timeCounter: any
  turn: number
  match: number
  lastTime: number
  firstPos: {
    x: Number
    y: Number
  }
  secondPos: {
    x: Number
    y: Number
  }
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
      endState: false,
      timeCounter: null,
      turn: 0,
      match: 0,
      firstPos: {
        x: 0,
        y: 0
      },
      secondPos: {
        x: 0,
        y: 0
      },
      lastTime: 0
    }
  },
  methods: {
    ...mapActions(useTimerStore, ['increment', 'resetTimer']),
    launchConfetti() {
      const canvasElement: any = this.$refs.confettiCanvas
      const myConfetti = confetti.create(canvasElement, {
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
      this.$router.replace({ name: 'card-select' })
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
    handleClick(e: any, card: Card) {
      if (this.temp.length === 0) {
        if (card.isPairFound) return
        this.temp.push(card)
        this.firstPos = {
          x: e.clientX,
          y: e.clientY
        }
      } else if (this.temp.length === 1) {
        if (this.temp[0].id === card.id || card.isPairFound) return
        this.temp.push(card)
        if (this.temp[0].content === this.temp[1].content) {
          this.secondPos = {
            x: e.clientX,
            y: e.clientY
          }
          this.setPairFound(this.temp[0])
          this.setPairFound(this.temp[1])
          this.match++

          confetti({
            particleCount: 100,
            spread: 120,
            origin: {
              x: this.firstPos.x.valueOf() / window.innerWidth,
              y: this.firstPos.y.valueOf() / window.innerHeight
            },
            startVelocity: 15,
            gravity: 0.3,
            scalar: 0.7
          })
          confetti({
            particleCount: 100,
            spread: 120,
            origin: {
              x: this.secondPos.x.valueOf() / window.innerWidth,
              y: this.secondPos.y.valueOf() / window.innerHeight
            },
            startVelocity: 15,
            gravity: 0.3,
            scalar: 0.7
          })

          if (this.checkAllPaired()) {
            this.lastTime = this.count
            this.endState = true
            this.launchConfetti()
          }
        }

        this.turn++
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
      this.navigateBack()
      this.turn = 0
      this.match = 0
      this.resetTimer()
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
    },
    ...mapStores(useTimerStore),
    ...mapState(useTimerStore, ['count'])
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
    this.timeCounter = setInterval(() => {
      this.increment()
    }, 1000)
  },
  beforeUnmount() {
    this.resetTimer()
    clearInterval(this.timeCounter)
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
      position: relative;
    "
  >
    <canvas
      ref="confettiCanvas"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none"
    ></canvas>
    <div
      style="width: 100%; height: 100%; flex-direction: column"
      :style="{ display: endState ? 'flex' : 'none' }"
    >
      <img
        src="/src/assets/image/congratulation.png"
        style="width: 80%; height: 60%; margin: auto"
      />
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
          position: relative;
        "
      >
        <div
          style="
            margin: auto;
            position: absolute;
            top: -70px;
            background-image: url('/src/assets/image/wood.jpg');
            padding: 10px 20px 10px 20px;
            border-radius: 10px;
          "
        >
          <span>
            <h1>Time : {{ lastTime }}</h1>
          </span>
          <span>
            <h1>Turn : {{ turn }}</h1>
          </span>
        </div>
        <div
          style="
            background-image: url('/src/assets/image/play.png');
            background-size: 100% 100%;
            width: 250px;
            height: 190px;
            cursor: pointer;
          "
          @click="restart()"
        ></div>
      </div>
    </div>
    <div class="header" :style="{ display: endState ? 'none' : 'flex' }">
      <img src="/src/assets/image/title.png" style="flex-grow: 1; height: 100%" />
      <img
        src="/src/assets/image/home.png"
        style="cursor: pointer"
        @click="navigateBack()"
        class="back-icon"
      />
    </div>
    <div
      :class="['container1']"
      style="grid-template-columns: 1fr 4fr 1fr"
      :style="{
        display: endState ? 'none' : 'grid'
      }"
    >
      <div style="height: 100%">
        <div style="height: 100%"></div>
      </div>
      <div :class="['container']" :style="{ gridTemplateColumns: `${gridMake(cardNum)}` }">
        <div
          v-for="(card, index) in cardList"
          :class="['card', checkFlipped(card), checkPaired(card)]"
          :key="index"
          @click="(e) => handleClick(e, card)"
        >
          <div>
            <div :class="['front']"></div>
            <div class="back" :style="{ backgroundImage: `url(${card.content})` }"></div>
          </div>
        </div>
      </div>
      <div style="padding-top: 50px; text-align: center; padding: 10px; font-family: cursive">
        <div class="woodboard first">
          <h1>Time</h1>
          <h2>{{ count }}</h2>
        </div>

        <div class="woodboard">
          <h1>Turns</h1>
          <h2>{{ turn }}</h2>
        </div>

        <div class="woodboard">
          <h1>Matches</h1>
          <h2>{{ match }}</h2>
        </div>
      </div>
    </div>
  </div>

  <div style=""></div>
</template>
<style>
.header {
  height: 180px;
  flex-direction: row;
  align-items: center;
}
.woodboard {
  background-image: url('/src/assets/image/wood.jpg');
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 1px;
}
h2 {
  margin-top: 3px;
  margin-bottom: 1px;
  color: wheat;
}
h1 {
  font-size: 29px;
  color: burlywood;
  margin-top: 1px;
  margin-bottom: 3px;
}
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
  height: 80%;
  display: grid;
  flex-grow: 1;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 10px;
  row-gap: 10px;
  justify-content: center;
  align-items: center;
}
.container1 {
  margin: auto;
  width: 100%;
  max-width: 800px;
  display: grid;
  flex-grow: 1;
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
  .header {
    height: 100px;
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
    min-width: 100px;
  }
  .container {
    column-gap: 3px;
    row-gap: 3px;
  }
  .back-icon {
    width: 50px;
    height: 50px;
  }
  h1 {
    font-size: 17px;
  }
  h2 {
    font-size: 15px;
  }
  .woodboard {
    border-radius: 10px;
    margin-bottom: 5px;
    padding: 1px;
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
