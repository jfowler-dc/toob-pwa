import Vue from 'vue'
import VueRouter from 'vue-router'

// Views/Components
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'All Stations',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/station/:stationCode',
    name: 'Station',
    component: () => import('../views/Station.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
