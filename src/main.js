import { createApp } from 'vue';
import { createPinia } from 'pinia';
import {refreshToken} from './api/auth.js';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import ClientSocket from './loaders/socket.js';
import './assets/main.css';
import piniPluginPersistedState from 'pinia-plugin-persistedstate';

let isRefresh = true;

axios.interceptors.response.use(async response => {
  const originalRequest = response.config;
  
  if (response.data.message === 'EXPIRED_TOKEN') {
    const isRefreshNewInstance = isRefresh;

    if (isRefreshNewInstance) {
      isRefresh = false;
      
      const refreshUserToken = await refreshToken();
      if(!refreshUserToken.success) {
        await logout();
        localStorage.clear();
        router.go('/login');
      }

      localStorage.setItem('accessToken', refreshUserToken.data.accessToken);
      localStorage.setItem('refreshToken', refreshUserToken.data.refreshToken);

      isRefresh = true;
      originalRequest.headers.Authorization = `Bearer ${refreshUserToken.data.accessToken}`;
      return await axios.request(originalRequest);
    } else {
      return await axios.request(originalRequest);
    }

  } else if (response.data.message === 'INVALID_TOKEN') {
    await logout();
    localStorage.clear();
    router.go('/login');
  }

  return response;
});

axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniPluginPersistedState);
app.use(pinia);
app.use(router);
app.mount('#app');

export const chatSocket = new ClientSocket('/chatting', 3001);