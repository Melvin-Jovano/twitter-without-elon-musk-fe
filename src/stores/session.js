import { ref } from 'vue'
import { defineStore } from 'pinia'

const session = defineStore('session', () => {
  const userId = ref(null);
  const username = ref(null);
  const photo = ref(null);

  return { 
    photo,
    userId,
    username
  }
}, {
  persist: true
});

export default session;
