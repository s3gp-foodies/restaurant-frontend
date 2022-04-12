import Product from "./product";
import ProductOrder from "./productorder";

export default class Menu {
    products: Product[];

    constructor(products: Product[]) {
      this.products = products;
    }
}