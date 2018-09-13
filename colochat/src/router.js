import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

// This is where all the URL paths are created. For example,
// This says that anyone going to the 'colochat.com/faq' page will
// load the 'FAQ.vue' component.
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('./views/FAQ.vue')
    },
    {
      path: '/info',
      name: 'furtherInfo',
      component: () => import('./views/FurtherInfo.vue')
    }
  ]
});

// router.afterEach(function (to, from) {
//   const handler = to.matched[0].components.default.afterRouteEnter;
//   if (handler) {
//     handler(to, from);
//   }
// });

export default router;
