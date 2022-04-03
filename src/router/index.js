import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Submission from '../views/Submission'
import Contest from '../views/Contest'
import Team from '../views/Team'
import Show from "../views/Show";
import AdminTeam from "../views/admin/Team";
import AdminPlatform from "../views/admin/Platform";
import AdminData from "../views/admin/Data";
import Rank from '../views/Rank';

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
  },
  {
    path: '/team/rank',
    name: 'Rank',
    component: Rank
  },
  {
    path: '/admin/team',
    name: 'AdminTeam',
    component: AdminTeam
  },
  {
    path: '/admin/platform',
    name: 'AdminPlatform',
    component: AdminPlatform
  },
  {
    path: '/admin/data',
    name: 'AdminData',
    component: AdminData
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=> {
  if (to.path.match("admin")) {
    // 如果访问的是管理员的界面，那么就先判断是否携带了token，有token就可以放心，没有的话就只能回到主界面
    let token = localStorage.getItem('token')
    token ? next() : next('/')
  } else{
    next()
  }
})

export default router
