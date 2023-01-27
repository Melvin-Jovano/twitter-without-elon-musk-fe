import { ref } from 'vue'
import { defineStore } from 'pinia'

const home = defineStore('home', () => {
  const trendKey = ref(0);

  return { 
    trendKey
  }
}, {
  persist: true
});

export default home;
