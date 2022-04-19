import OrderOverviewProduct from "./order-overview-product";

export default class OrderOverview {
    time: Date;
    totalprice: number;
    products: OrderOverviewProduct[];

    constructor(time: Date, totalprice: number, products: OrderOverviewProduct[]){
        this.time=time;
        this.totalprice=totalprice;
        this.products=products;
    }

}