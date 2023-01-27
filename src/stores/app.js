import { ref } from 'vue';
import { defineStore } from 'pinia';

const app = defineStore('app', () => {
  const showOption = ref(false);

  return {
    showOption
  }
});

export default app;
