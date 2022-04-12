import ProductOrder from "./productorder";

export default class Order {
    id: Number;
    time: Date;
    products: ProductOrder[]; 

    constructor(id: Number, time: Date, products: ProductOrder[]) {
      this.id = id;
      this.time = time;
      this.products = products;
    }
}