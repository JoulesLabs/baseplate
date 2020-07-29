require('./bootstrap')

import Vue from 'vue'
import store from '~/store'
import router from '~/router'
import App from '~/components/App'

import '~/plugins'
import '~/components'

import moment from 'moment-timezone'
import global from './global'

Vue.config.productionTip = false

import HelperMixer from "./mixins/Helpers"
import RequestMixer from "./mixins/Request"

Vue.mixin(HelperMixer)
Vue.mixin(RequestMixer)

moment.tz.setDefault("Asia/Dhaka")

/* eslint-disable no-new */
new Vue({
  store,
  router,
  ...App
})
