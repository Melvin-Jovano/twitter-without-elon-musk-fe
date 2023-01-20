import { ref } from 'vue'
import { defineStore } from 'pinia'

const chatList = defineStore('chatList', () => {
  const list = ref([]);

  return { 
    list
  }
});

export default chatList;
