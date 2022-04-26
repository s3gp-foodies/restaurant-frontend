import OrderProduct from "./order-product";

export default class Order {
    id: Number;
    time: string;
    products: OrderProduct[];

    constructor(id: Number, time: string, products: OrderProduct[]) {
      this.id = id;
      this.time = time;
      this.products = products;
    }
}