import OrderListingProduct from "./order_listing_product";

export default class OrderListing {
    time: Date;
    totalprice: number;
    products: OrderListingProduct[];

    constructor(time: Date, totalprice: number, products: OrderListingProduct[]){
        this.time = time;
        this.totalprice = totalprice;
        this.products = products;
    }

}