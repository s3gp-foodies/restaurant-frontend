export default class OrderProductTracker {
    productName: string;
    count: Number;
    category: string;

    constructor(productName: string, count: Number, category: string) {
      this.productName = productName;
      this.count = count;
      this.category = category;
    }
}