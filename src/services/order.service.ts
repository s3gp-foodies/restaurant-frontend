import axios from 'axios';
import authHeader from '../helpers/auth-header';
import SessionOrders from "@/models/session-orders";
import Order from "@/models/order";
import OrderProduct from "@/models/order-product";
import Product from "@/models/product";
import current from "@/views/Current.vue";
import { useToast } from "vue-toastification";


const toast = useToast();
const API_URL = 'https://localhost:7209/api/order/';
const sessionOrders: SessionOrders = new SessionOrders([]);
const currentOrder: OrderProduct[] = [];

class OrderService {
    GetOrders() {
        return sessionOrders
    }

    GetCurrentOrderCount(product: Product) {
        this.LoadCurrentFromStore();
        const co = currentOrder.find(o => o.productId == product.id);
        if (co) return co.count;
        return 0;
    }

    UpdateCurrentOrder(product: Product, count: number) {
        let order = currentOrder.find(o => o.productId == product.id);
        if (order) order.count = count
        else {
            order = new OrderProduct(product.id, count);
            currentOrder.push(order);
        }
        // this.SaveCurrentToStore()
    }
    DeleteFromCurrentOrder(product: Product){
        const order = currentOrder.find(o => o.productId == product.id)
        console.log(order)
        console.log(currentOrder)
    }
    Save(){
        this.SaveCurrentToStore()
    }
    private SaveCurrentToStore() {
        localStorage.setItem("AllOrdersOverview", JSON.stringify(currentOrder));
        toast.success("Product toegevoegd aan order");
    }

    private LoadCurrentFromStore() {
        currentOrder.length = 0;
        const currentOrderString = localStorage.getItem("AllOrdersOverview");
        if (!currentOrderString) return false;
        const co = JSON.parse(currentOrderString);
        co.forEach((op: any) => currentOrder.push(op))
        console.log(co)
    }


    async LoadOrders() {
        // await axios.get(API_URL+"orders", {headers: authHeader()}).then(response => {
        //     response.data.forEach((response: any) => {
        //         sessionOrders.orders.push(<Order>({
        //             id: response.Id,
        //             time: response.OrderTime,
        //             products:
        //         }));
        //     });
        //     }).catch(error => {
        //     console.log(error)
        // });
        //TODO: This is a mock
        if (sessionOrders.orders.length === 0) {
            const product_order_1 = new OrderProduct(2, 1);
            const product_order_2 = new OrderProduct(2, 4);
            const product_order_3 = new OrderProduct(3, 2);
            const product_order_4 = new OrderProduct(4, 5);

            const order_1 = new Order(0, "01:16", [product_order_1, product_order_3, product_order_4]);
            const order_2 = new Order(1, "02:10", [product_order_2]);

            sessionOrders.orders.push(order_1);
            sessionOrders.orders.push(order_2);
        }
    }
}

export default new OrderService();