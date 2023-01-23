import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/main.css'

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

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
