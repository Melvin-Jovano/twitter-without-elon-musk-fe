import { ref } from 'vue'
import { defineStore } from 'pinia'

const chat = defineStore('chat', () => {
  const messages = ref([]);
  const list = ref([]);
  const chatListKey = ref(0);
  const showHeading = ref(true);
  const name = ref('');
  const photo = ref('');

  return {
    photo,
    name,
    messages,
    list,
    chatListKey,
    showHeading
  }
});

export default chat;
