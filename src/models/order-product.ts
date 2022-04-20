export default class OrderProduct {
    productId: Number;
    count: Number;

    constructor(productId: Number, count: Number) {
      this.productId = productId;
      this.count = count;
    }
}