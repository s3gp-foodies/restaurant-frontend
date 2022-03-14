import { createRouter, createWebHistory } from 'vue-router'
import Menu from '../views/Menu.vue'
import Orders from '../views/Orders.vue'
import Order from '../views/Order.vue'

const routes = [
  {
    path: '/',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: routes,
  linkActiveClass: 'active'
})

export default router
