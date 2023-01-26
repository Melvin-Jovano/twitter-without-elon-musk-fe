import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import ProfileView from '../views/ProfileView.vue';
import MessageView from '../views/MessageView.vue';
import RegisterView from '../views/RegisterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/',
      name: 'root',
      component: LoginView
    },
    {
      path: '/message',
      name: 'message',
      component: MessageView
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = (localStorage.getItem('accessToken') !== null && localStorage.getItem('refreshToken') !== null);

  if(!isAuthenticated && (to.name !== 'login' || to.path === '/' || to.name === 'register')) {
    return next({name: 'login'});
  }

  if(isAuthenticated && (to.name === 'login' || to.path === '/') && from.name !== 'home') {
    return next({name: 'home'});
  }

  return next();
})

export default router;
