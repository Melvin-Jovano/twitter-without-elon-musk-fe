import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import ProfileView from '../views/ProfileView.vue';
import MessageView from '../views/MessageView.vue';
import FollowerList from '../components/follower/FollowerList.vue'
import RegisterView from '../views/RegisterView.vue';
import DetailPosts from '../components/home/DetailPosts.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        middleware: [checkSession]
      }
    },
    {
      path: '/home/:id',
      name: 'detail',
      component: DetailPosts,
      meta: {
        middleware: [checkSession]
      }
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
      ],
      meta: {
        middleware: [checkSession]
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        middleware: [checkSession]
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        middleware: [checkSession]
      }
    },
    {
      path: '/',
      name: 'root',
      component: LoginView,
      meta: {
        middleware: [checkSession]
      }
    },
    {
      path: '/message',
      name: 'message',
      component: MessageView,
      meta: {
        middleware: [checkSession]
      }
    }
  ]
});

function middlewarePipeline (context, middleware, index) {
  const nextMiddleware = middleware[index]

  if(!nextMiddleware){
      return context.next
  }

  return () => {
      const nextPipeline = middlewarePipeline(
          context, middleware, index + 1
      )

      nextMiddleware({ ...context, next: nextPipeline })

  }
}

function checkSession({to, from, next}) {
  const isAuthenticated = (localStorage.getItem('accessToken') !== null && localStorage.getItem('refreshToken') !== null);

  if(!isAuthenticated && to.name === 'register') {
    return next();
  }

  if(!isAuthenticated && (to.name !== 'login' || to.path === '/')) {
    return next({name: 'login'});
  }

  if(isAuthenticated && (to.name === 'register' || to.name === 'login' || to.path === '/')) {
    return next({name: 'home'});
  }

  return next();
}

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
      return next()
  }

  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
  }

  return middleware[0]({
      ...context,
      next: middlewarePipeline(context, middleware, 1)
  })
})

export default router;
