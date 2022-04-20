import axios from 'axios';
import authHeader from '../helpers/auth-header';
import SessionOrders from "@/models/session-orders";
import Order from "@/models/order";
import OrderProduct from "@/models/order-product";
import Product from "@/models/product";

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
        this.SaveCurrentToStore();
    }

    private SaveCurrentToStore() {
        sessionStorage.setItem("CurrentOrder", JSON.stringify(currentOrder));
    }

    private LoadCurrentFromStore() {
        currentOrder.length = 0;
        const currentOrderString = sessionStorage.getItem("CurrentOrder");
        if (!currentOrderString) return false;
        const co = JSON.parse(currentOrderString);
        co.forEach((op: any) => currentOrder.push(op))
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