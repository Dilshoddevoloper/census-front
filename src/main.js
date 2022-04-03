import Vue from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import '@/assets/scss/main.scss'
import { VueMaskDirective } from 'v-mask'
import lang from './assets/lang/uz-cyril-UZ'
import locale from 'element-ui/lib/locale'
Vue.directive('mask', VueMaskDirective)
import i18n from '@/utils/i18n'

Vue.config.productionTip = false

// configure language
locale.use(lang)

// Init ElementUI components
Vue.use(ElementUI)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
