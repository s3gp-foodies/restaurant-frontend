import {createRouter, createWebHistory} from 'vue-router'
import Menu from '../views/Menu.vue'
import Orders from '../views/Orders.vue'
import Login from '../views/Login.vue'
import OrderTracker from "@/views/OrderTracker.vue";
import testDraggble from "@/views/testDraggble.vue";
import vueDraggableTest from "@/views/vueDraggbleTest.vue";
import CurrentOrderPage from "@/views/Current.vue";
import {useToast} from "vue-toastification";

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
        component: OrderTracker
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

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !localStorage.getItem("token")){
        next({ name: 'Login' })
        useToast().error("Please sign in first")
    }
    else next()
})

export default router
