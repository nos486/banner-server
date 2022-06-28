import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'

import VueMousetrapPlugin from 'vue-mousetrap/vue2'
Vue.use(VueMousetrapPlugin)

Vue.config.productionTip = false

//mixin
import Server from "./mixins/Server";
Vue.mixin(Server)

new Vue({
  vuetify,
  render: h => h(App),
  store,
}).$mount('#app')
