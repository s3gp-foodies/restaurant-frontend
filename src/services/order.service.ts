import SessionOrders from "@/models/session-orders";
import Order from "@/models/order";
import OrderProduct from "@/models/order-product";
import Product from "@/models/product";
import {useToast} from "vue-toastification";
import {SocketConsumer} from "@/services/socket-consumer";
import axios from "axios";
import authHeader from "@/helpers/auth-header";
import { store } from "@/store/store";

const toast = useToast();
const API_URL = 'https://localhost:7209/api/order/';
const sessionOrders: Order[] = [];
const currentOrder: OrderProduct[] = [];

class OrderService extends SocketConsumer {
    // Add websocket functions in this constructor
    Init() {   
        this.RegisterUpdateOrder();
    }

    public GetOrders() : Order[] {
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

    DeleteFromCurrentOrder(product: Product) {
        const test = currentOrder.find(p => console.log(p.productId))
        console.log(test)
        console.log(currentOrder)
    }

    Save() {
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
    }

    public MakeOrder() {
        if(currentOrder.length == 0) {
            toast.error("Please add items to order")
        } else {
            this._socketService?.Invoke("SubmitOrder", currentOrder)
                .then(async () => localStorage.removeItem("AllOrdersOverview"))
                .catch(() => toast.warning("wrong"))
                .then(() => toast.success("Order added"))

            //router.push({path: '/menu'}).then(() => window.location.reload())
        }
    }

    RegisterUpdateOrder() {
        this._socketService?.connection.on("AddOrder", order => this.AddOrder(order))
    }

    public async LoadOrders() {
        if (sessionOrders.length !== 0) return;

        await axios.get(API_URL + "orders", {headers: authHeader()}).then(response => {
            response.data.forEach((order: any) => {
                const products: OrderProduct[] = []
                order.items.forEach((item: any) => {
                    products.push(new OrderProduct(item.itemId, item.quantity))
                })
                sessionOrders.push(new Order(order.id, order.orderTime, products))
            });
        }).catch(error => {
            console.log(error)
        });
    }

    async AddOrder(order: Order) {
        store.commit("AddOrder", order)

        if (order['products'].length > 0) {
            const neworder = new Order(order['id'], order['time'], order['products']);

            sessionOrders.push(neworder);
        }
    }
}

export default OrderService;