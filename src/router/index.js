import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import About from '../views/Home/About.vue'
import Router from '../views/Card/EveryView.vue'
import CardForm from '../views/Card/CardForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/card/new',
    component: CardForm
  },
  {
    path: '/card/:id/show',
    component: Router
  }
]

const router = new VueRouter({
  routes
})

export default router
