import Vue from 'vue'
import App from './App.vue'
import io from 'socket.io-client'
// import shared from '../../shared/dist/index.js'
import shared from '../../shared/src/index.js'
// import shared from '../shared/dist/index.js'

Vue.config.productionTip = false
Vue.prototype.$io = io('localhost:4113')
Vue.use(shared.Vuex)

const store = shared.createStore()

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
