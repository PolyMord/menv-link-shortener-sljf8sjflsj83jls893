import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import message from './plugins/message.plugin.js'
import 'materialize-css'
import './assets/style.css'

Vue.config.productionTip = false

Vue.use(message)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
