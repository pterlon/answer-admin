import Vue from 'vue'
import VueRouter from 'vue-router'
import { isLogined } from '@/api/request'
import store from '@/store/index'

const Login = () => import('@/views/login/Login');
const Create = () => import('@/views/create/CreateView');
const Audit = () => import('@/views/audit/AuditView');
const AuditGame = () => import('@/views/audit/AuditGame');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
  },
  {
    path: '/audit',
    name: 'Audit',
    component: Audit,
    children: [
      {
        path: 'game',
        name: 'AuditGame',
        component: AuditGame,
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((async (to, from, next) => {
  let token = window.localStorage.getItem('token');
  if (to.path === '/login') {
    if (token) {
      let res = await isLogined();
      if (res.status === 401) return next();
      store.commit('init', res.data);
      return next('/create');
    } else {
      return next();
    }
  }
  if (token) {
    if (store.state.userinfo) {
      return next();
    }
    let res = await isLogined();
    if (res.status === 401) return;
    store.commit('init', res.data);
  } else {
    return next('/login');
  }
  return next();
}))

export default router
