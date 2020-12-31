import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import About from '../views/Home/About.vue'
import Router from '../views/Card/EveryView.vue'
import CardForm from '../views/Card/CardForm.vue'
import UserPage from '../views/User/UserPage.vue'
import CardEdit from '../views/Card/CardEdit.vue'

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
  },
  {
    path: '/card/:id/edit',
    component: CardEdit
  },
  {
    path: '/user',
    component: UserPage
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
