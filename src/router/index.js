import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import ProfileView from '../views/ProfileView.vue';
import MessageView from '../views/MessageView.vue';
import FollowerList from '../components/follower/FollowerList.vue'

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
      component: ProfileView,
      children:[
        {
          path: '/profile/follower',
          name: 'follower',
          component: FollowerList
        },
        {
          path: '/profile/following',
          name: 'following',
          component: FollowerList
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/message',
      name: 'message',
      component: MessageView
    }
  ]
});

export default router
