import Vue from 'vue'
import App from './App.vue'
import io from 'socket.io-client'
import shared from '../../shared/src/index.js'
import clientModule from '../../shared/src/vuex-modules/client.js'

Vue.config.productionTip = false
Vue.prototype.$io = io('localhost:4113')
// Vue.prototype.$io = io('192.168.0.3:4113')
Vue.use(shared.Vuex)

const store = shared.createStore()
store.registerModule('client', clientModule)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
