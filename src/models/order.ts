import ProductOrder from "./productorder";

export default class Order {
    id: Number;
    time: String;
    products: ProductOrder[]; 

    constructor(id: Number, time: String, products: ProductOrder[]) {
      this.id = id;
      this.time = time;
      this.products = products;
    }
}