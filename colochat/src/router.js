import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

// This is where all the URL paths are created. For example,
// This says that anyone going to the 'colochat.com/faq' page will
// load the 'FAQ.vue' component.
export default new Router({
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
