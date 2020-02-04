import Vue from 'vue'
import App from './components/App/App.vue'
import VueRouter from 'vue-router'
import CountriesList from './components/CountriesList/CountriesList.vue'
import CountryDetail from './components/CountryDetail/CountryDetail.vue'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/:cca2',
      name: 'country',
      components: [App, CountriesList, CountryDetail],
      props: true
    }
  ]
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
