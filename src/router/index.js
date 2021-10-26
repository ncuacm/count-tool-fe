import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Submission from '../views/Submission'
import Contest from '../views/Contest'
import Team from '../views/Team'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contest/submission',
    name: 'Submission',
    component: Submission
  },
  {
    path: '/contest/info',
    name: 'Contest',
    component: Contest
  },
  {
    path: '/team/info',
    name: 'Team',
    component: Team
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
