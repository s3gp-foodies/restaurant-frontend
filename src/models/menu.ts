import Product from "./product";
import OrderProduct from "./order-product";

export default class Menu {
    products: Product[];

    constructor(products: Product[]) {
      this.products = products;
    }
}