import Product from "./product";

export default class Menu {
    products: Product[];

    constructor(products: Product[]) {
      this.products = products;
    }
}