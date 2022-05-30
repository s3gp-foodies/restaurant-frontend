import OrderProductTracker from "@/models/orderTrackerModels/orderProductTracker";

export default class OrderTrackerModel {
    tableId: string;
    time: string;
    products: OrderProductTracker[];

    constructor(tableId: string, time: string, products: OrderProductTracker[]) {
      this.tableId = tableId;
      this.time = time;
      this.products = products;
    }
}