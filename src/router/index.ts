import {createRouter, createWebHistory} from 'vue-router'
import Menu from '../views/Menu.vue'
import Orders from '../views/Orders.vue'
import Order from '../views/Order.vue'
import Login from '../views/Login.vue'
import dishOverview from "@/views/DishOverview.vue";
import testDraggble from "@/views/testDraggble.vue";
import vueDraggableTest from "@/views/vueDraggbleTest.vue";
import CurrentOrderPage from "@/views/Current.vue";

const routes = [
    {
        path: '/menu',
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
    },
    {
        path: '/current',
        name: 'Current',
        component: CurrentOrderPage
    },
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/dish-overview',
        name: 'DishOverview',
        component: dishOverview
    },
    {
        path: '/testDrag',
        name: 'testDrag',
        component: testDraggble
    },
    {
        path: '/VueDrag',
        name: 'vueDrag',
        component: vueDraggableTest
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routes,
    linkActiveClass: 'active'
})

export default router
