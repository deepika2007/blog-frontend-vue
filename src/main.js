// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import 'vuelidate/dist/vuelidate.min.js'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import { LoaderPlugin } from 'vue-google-login';

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(Vuetify)
Vue.use(LoaderPlugin, {
  client_id: '577861637724-qalk6he4i8bpq61ik4d4hovnj92fjqf2.apps.googleusercontent.com'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  Vuetify,
  components: { App },
  template: '<App/>'
})
