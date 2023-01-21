import { ref } from 'vue'
import { defineStore } from 'pinia'

const chat = defineStore('chat', () => {
  const messages = ref([]);

  return { 
    messages
  }
});

export default chat;
