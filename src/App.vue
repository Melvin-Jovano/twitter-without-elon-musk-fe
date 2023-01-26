<template>
  <RouterView />
</template>

<script setup>
  import { onMounted } from 'vue';
  import app from './stores/app';

  const appStores = app();

  onMounted(() => {
    document.body.addEventListener('click', (e) => {
      try {
        if(e.target.dataset.event === 'removeOptions') {
          appStores.showOption = !appStores.showOption;
          return;
        }
        throw Error();
      } catch (error) {
        appStores.showOption = false;
      }
    });
  });
</script>