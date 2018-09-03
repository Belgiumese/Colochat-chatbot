import Vue from 'vue';
import App from './App.vue';
import $ from 'jquery';
import router from './router';

// This is just an auto-generated main file which
// starts up the application. The exact details
// aren't important.

Vue.config.productionTip = false;

// Add jQuery globally available 'this.$'
const jQUery = {
  install() {
    Vue.$ = $;
    Vue.prototype.$ = $;
  }
};
Vue.use(jQUery);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
