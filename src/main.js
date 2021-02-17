import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { InfiniteScroll } from 'element-ui'

Vue.use(InfiniteScroll);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
