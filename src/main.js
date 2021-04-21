import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css'

import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter.js'
import currencyFilter from '@/filters/currency.filter.js'
import messagePlagin from '@/utils/message.plagin'
import Loader from '@/components/app/Loader'
import 'materialize-css/dist/js/materialize'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlagin)
Vue.use(Vuelidate)

Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('Loader', Loader)


// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyALaUEQqvSoL4uxS-NLvcoG49Ct4eKvK68",
  authDomain: "vue-crm-ea6db.firebaseapp.com",
  projectId: "vue-crm-ea6db",
  storageBucket: "vue-crm-ea6db.appspot.com",
  messagingSenderId: "985656265936",
  appId: "1:985656265936:web:e63f42189d5e4980eb62d5"
});

let app

firebase.auth().onAuthStateChanged(()=>{
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


