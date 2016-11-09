import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import { sync } from 'vuex-router-sync'

import App from './App'
import store from './store/index'
import router from './router/index'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Vuex)

// Vue.config.debug = process.env.NODE_ENV === 'dev'

sync(store, router)

/* eslint-disable no-new */
new Vue({
    el: '#entry',
    router,
    store,
    render: h => h(App)
})