import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import auth from './middleweres/auth'
import citizensRouter from './modules/citizen'
import applicationsRouter from './modules/application'
import middlewarePipeline from './middlewarePipeline'
import partiesRouter from './modules/parties'
Vue.use(Router)
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {

    path: '/',
    component: () => import('@/layouts/main'),
    children: [
      {
        name: 'Login',
        path: '/login',
        component: () => import('@/views/Login'),
        meta: { middleware: [auth] }
      },
      {
        name: 'ChooseType',
        path: '/',
        component: () => import('@/views/choose-type'),
      },
      {
        name: 'Report',
        path: '/report',
        component: () => import('@/views/report/report'),
        meta: { middleware: [auth] }
      },
      {
        name: 'ReportCityShow',
        path: '/report/:id(\\d+)',
        component: () => import('@/views/report/show'),
        meta: { title: 'Роли', noCache: true, activeMenu: 'report' },
        hidden: true
      },
      {
        name: 'Auth',
        path: '/auth',
        component: () => import('@/views/auth/Token')
      },
      {
        name: 'CitizensAll',
        path: '/citizen',
        component: () => import('@/views/citizen/index'),
        meta: { middleware: [auth] }
      }
    ]
  },
  {
    path: '/',
    component: () => import('@/layouts/main'),
    meta: { middleware: [auth] },
    children: [
      ...citizensRouter,
      ...partiesRouter
    ]
  },
  {
    path: '/token',
    component: () => import('@/layouts/main')
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/login-redirect',
    beforeEnter(to, from, next) {
      // Put the full page url including the protocol http(s) below
      const params = {
        client_id: process.env.VUE_APP_KADRLAR_CLIENT_ID,
        redirect_uri: process.env.VUE_APP_KADRLAR_REDIRECT_URL,
        response_type: process.env.VUE_APP_KADRLAR_RESPONSE_TYPE
      }
      const queryString = Object.keys(params).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
      }).join('&')
      window.location = 'https://kadrlar.mehnat.uz/oauth/authorize?' + queryString
    }
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()
router.beforeEach((to, from, next) => {
  const middlewares = []
  to.matched.filter(route => route.meta.middleware).forEach(route => {
    if (Array.isArray(route.meta.middleware)) {
      route.meta.middleware.forEach(middleware => middlewares.push(middleware))
    } else {
      middlewares.push(route.meta.middleware)
    }
  })
  if (middlewares.length === 0) {
    return next()
  }
  const context = {
    to,
    from,
    next,
    store
  }
  return middlewares[0]({
    ...context,
    next: middlewarePipeline(context, middlewares, 1)
  })
})
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
