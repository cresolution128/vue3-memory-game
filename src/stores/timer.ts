import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }
  function resetTimer() {
    count.value = 0;
  }

  return { count, increment, resetTimer }
})
