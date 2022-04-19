import OrderProduct from "./order-product";

export default class Order {
    id: Number;
    time: Date;
    products: OrderProduct[];

    constructor(id: Number, time: Date, products: OrderProduct[]) {
      this.id = id;
      this.time = time;
      this.products = products;
    }
}