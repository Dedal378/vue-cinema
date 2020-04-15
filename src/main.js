import Vue from 'vue'
import './registerServiceWorker'
import Vuelidate from 'vuelidate'
import UImini from 'uimini/src/stylus/main.styl'
import UIminiAnimate from './assets/stylus/base/animation.styl'
import UIminiMessage from './assets/stylus/base/message-box.styl'

import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'

Vue.use(
  Vuelidate,
  UImini,
  UIminiAnimate,
  UIminiMessage
)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created () {
    var firebaseConfig = {
    // config
    }
    firebase.initializeApp(firebaseConfig)
    // firebase.analytics()
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('loggedUser', user)
      }
      this.$store.dispatch('loadTasks')
    })
  },
  render: h => h(App)
}).$mount('#app')
