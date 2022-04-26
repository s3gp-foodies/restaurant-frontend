import Order from "@/models/order";

export default class SessionOrders {
    orders: Order[];

    constructor(orders: Order[]) {
        this.orders=orders;
    }
}