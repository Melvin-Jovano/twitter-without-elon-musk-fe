import { ref } from 'vue';
import { defineStore } from 'pinia';

const chat = defineStore('chat', () => {
  const messages = ref([]);
  const messagesLastId = ref([]);
  const list = ref([]);
  const listLastId = ref(null);
  const chatListKey = ref(0);
  const showHeading = ref(true);
  const name = ref('');
  const photo = ref('');
  const groupId = ref(0);

  return {
    messagesLastId,
    listLastId,
    groupId,
    photo,
    name,
    messages,
    list,
    chatListKey,
    showHeading
  }
});

export default chat;
