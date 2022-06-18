import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import net from "net";

import VueMousetrapPlugin from 'vue-mousetrap/vue2'
Vue.use(VueMousetrapPlugin)

Vue.config.productionTip = false

Vue.prototype.$server = null
Vue.prototype.$socket = null

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
