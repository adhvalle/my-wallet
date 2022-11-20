import { retrieveWallet } from '@/models/wallet'

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/DashboardView.vue')
  }
]

export default routes.map(route => ({
  ...route,
  beforeEnter: [
    async () => { await retrieveWallet() }
  ]
}))
