import { createWebHistory, createRouter } from 'vue-router'
import publicRoutes from './public'
import privateRoutes from './private'

const state = { router: null }

const initRouter = () => {
  state.router = createRouter({
    history: createWebHistory(),
    routes: [
      ...publicRoutes,
      ...privateRoutes,
      {
        path: '/',
        redirect: { name: 'login' }
      }
    ],
    scrollBehavior (_, __, savedPosition) {
      return savedPosition || { top: 0 }
    }
  })

  return state.router
}

export const getRouter = () => state.router || initRouter()

export const getRoute = () => getRouter()?.currentRoute?.value

export default getRouter
