import { ref } from 'vue'
import { defineStore } from 'pinia'

const session = defineStore('session', () => {
  const userId = ref(parseInt(localStorage.getItem('user')));

  return { 
    userId,
  }
});

export default session;
