import SessionOrders from "@/models/session-orders";
import Order from "@/models/order";
import OrderProduct from "@/models/order-product";
import Product from "@/models/product";
import {useToast} from "vue-toastification";
import {SocketConsumer} from "@/services/socket-consumer";
import router from "@/router/index";

const toast = useToast();
const API_URL = 'https://localhost:7209/api/order/';
const sessionOrders: SessionOrders = new SessionOrders([]);
const currentOrder: OrderProduct[] = [];

class OrderService extends SocketConsumer {
    // Add websocket functions in this constructor
    Init(){

    }

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

    public MakeOrder(){
        console.log(currentOrder)
        if(currentOrder.length == 0){
            toast.error("Please add items to order")
        }else {
            this._socketService?.Invoke("SubmitOrder", currentOrder).then(async () => localStorage.removeItem("AllOrdersOverview")).catch(() => toast.warning("wrong"))
                .then(() => toast.success("Order added"))
            //router.push({path: '/menu'}).then(() => window.location.reload())
        }

    }

    async LoadOrders() {
        console.log(this._socketService?.order['tableId']);
        console.log(this._socketService?.order['time']);
        console.log(this._socketService?.order['products']);

        this._socketService?.order['products'].forEach((element: any) => console.log(element));

        //TODO: This is a mock
        if (sessionOrders.orders.length === 0) {
            const product_order_1 = new OrderProduct(2, 2);
            const product_order_2 = new OrderProduct(4, 4);

            const order = new Order(0, "01:16", [product_order_1, product_order_2]);

            sessionOrders.orders.push(order);
        }
    }

}

export default OrderService;