import Vue from 'vue';
import App from './App.vue';
import router from './router';
import SvgIcon from 'vue-svgicon';

// This is just an auto-generated main file which
// starts up the application. The exact details
// aren't important.

Vue.config.productionTip = false;

Vue.use(SvgIcon, {
  tagName: 'svgicon'
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
