export default class ProductOrder {
    productid: Number;
    count: Number;

    constructor(productid: Number, count: Number) {
      this.productid = productid;
      this.count = count;
    }
}