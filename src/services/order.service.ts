import SessionOrders from "@/models/session-orders";
import Order from "@/models/order";
import OrderProduct from "@/models/order-product";
import Product from "@/models/product";
import Toast, {useToast} from "vue-toastification";
import {SocketConsumer} from "@/services/socket-consumer";
import router from "@/router";
import axios from 'axios';
import authHeader from "@/helpers/auth-header";
import {store} from "@/store/store"
import orderTrackerModel from "@/models/orderTrackerModels/orderTracker"
import orderList from "@/components/AllOrdersOverview/OrderList.vue";

const toast = useToast();
const API_URL = 'https://localhost:7209/api/order/';
const sessionOrders: Order[] = [];
const currentOrder: OrderProduct[] = [];

class OrderService extends SocketConsumer {
    // Add websocket functions in this constructor
    Init() {
        this._socketService?.connection.on("UpdateOrder", order => this.LoadEmployeeOrders(order))
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

    public MakeOrder()
        {
            const newCO = currentOrder.filter(function (obj) {
                return obj.count > 0
            })
            if (currentOrder.length == 0) {
                toast.error("Order cannot be empty")
            }
            else{
                this._socketService?.Invoke("SubmitOrder", newCO)
                .then(async () => localStorage.removeItem("AllOrdersOverview"))
                .catch(() => toast.warning("wrong"))
                .then(() => toast.success("Order added"))

                setTimeout(() => router.push({path: '/menu'}), 4000);
            }
        }

    RegisterUpdateOrder() {
        this._socketService?.connection.on("AddOrder", order => this.AddOrder(order))
    }

    public async LoadOrders() {
        //if (sessionOrders.length !== 0) return;
        sessionOrders.length = 0;

        await axios.get(API_URL + "orders", {headers: authHeader()}).then(response => {
            response.data.forEach((order: any) => {
                const products: OrderProduct[] = []
                order.items.forEach((item: any) => {
                    products.push(new OrderProduct(item.menuItemId, item.quantity))
                })
                sessionOrders.push(new Order(order.id, order.orderTime, products))
            });
        }).catch(error => {
            console.log(error)
        });
    }

    public async ClearOrders() {
        console.log(authHeader())
        await axios.patch(API_URL + "end-session",{}, {headers: authHeader()}).catch((error) => {
            console.log(error);
        });
    }

    async getPanelOrders(services: string) {
        await axios.get(API_URL + "getAllStaffOrders", {headers: authHeader()}).then(res => {
            if (!res) {console.log("No orders found")}
            const date = new Date();

            function padTo2Digits(num : any) {
                return num.toString().padStart(2, '0');
            }

            const year = date.getFullYear();
            const month = padTo2Digits(date.getMonth() + 1);
            const day = padTo2Digits(date.getDate());

            const withHyphens = [year, month, day].join('-');

            for(let i =0; i < res.data.length; i++) {
                if(withHyphens == res.data[i].time.split('T')[0]) {
                    let result;
                    if(services === "Orders") {
                        store.commit("AddDishData", {"tableId": res.data[i].tableId, "time": res.data[i].time, "products": []})
                        result = store.getters.GetDishesOrderByTime(res.data[i].time)
                    }
                    else {
                        store.commit("AddDrinksData", {"tableId": res.data[i].tableId, "time": res.data[i].time, "products": []})
                        result = store.getters.GetAllDrinksDataByTime(res.data[i].time)
                    }
                    result = this.AddTheSeparateProducts(result, i, res, services)
                }
            }
        }).catch(ex => {
            console.log(ex.response)
        })
    }

    AddTheSeparateProducts(resultData: any, currentNumber: number, resData: any, servicesType: string) {
        for(let l = 0; l < resData.data[currentNumber].products.length; l++) {
            if(resData.data[currentNumber].products[l].category != "Drinks" && servicesType == "Orders") {
                resultData = this.AddDataToOrder(resultData, resData.data[currentNumber].products[l])
            } else if(resData.data[currentNumber].products[l].category === "Drinks" && servicesType == "Drinks") {
                resultData = this.AddDataToOrder(resultData, resData.data[currentNumber].products[l])
            }
        }
        return resultData
    }

    AddDataToOrder(orderList : any, product: any) {
        for(let i = 0; i < orderList.length; i++) {
            orderList[i]["products"].push(product)
        }
        return orderList
    }

    async LoadEmployeeOrders(order: orderTrackerModel) {
        const tableId = order.tableId.toString()
        store.commit("AddDishData", new orderTrackerModel(tableId, order.time, order.products))
    }

    public updateItemStatus(productID: number, status: string) {
        console.log([productID, status])
        this._socketService?.Invoke("UpdateOrderItemStatus", [productID, status]).then(x => {
            console.log(x)
        })
    }

    async AddOrder(order: Order) {
        store.commit("AddOrder", order)

        if (order['products'].length > 0) {
            const neworder = new Order(order['id'], order['time'], order['products']);

            sessionOrders.push(neworder);
        }
    }

    public SubmitPayment(totalPrice: any, succes: boolean) {
        if (succes) {
            toast.success("Payment succesful with total price: €" + parseFloat(totalPrice).toFixed(2) + ".");
        } else {
            toast.error("Payment failed, make sure to add an order.");
        }  
    }
}

export default OrderService;