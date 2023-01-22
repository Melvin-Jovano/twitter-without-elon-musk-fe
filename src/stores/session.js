import { ref } from 'vue'
import { defineStore } from 'pinia'

const session = defineStore('session', () => {
  const userId = ref(3);

  return { 
    userId,
  }
});

export default session;
