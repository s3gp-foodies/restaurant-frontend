import OrderOverviewProduct from "./order-overview-product";

export default class OrderOverview {
    time: string;
    totalprice: number;
    products: OrderOverviewProduct[];

    constructor(time: string, totalprice: number, products: OrderOverviewProduct[]){
        this.time=time;
        this.totalprice=totalprice;
        this.products=products;
    }

}