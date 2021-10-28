import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Submission from '../views/Submission'
import Contest from '../views/Contest'
import Team from '../views/Team'
import Show from "../views/Show";

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
  },
  {
    path: '/information',
    name: 'Information',
    component: Show
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
