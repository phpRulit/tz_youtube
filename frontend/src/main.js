import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';

Vue.router = router

Vue.config.productionTip = false

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  created() {
    axios.interceptors.response.use(
        response => response,
        error => {
          return Promise.reject(error);
        })
  },
  render: h => h(App)
}).$mount('#app')
