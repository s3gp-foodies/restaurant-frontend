export default class OrderListingProduct {
    name: string;
    price: number;
    count: number;
    totalprice: number;

    constructor(name: string, price: number, count: number, totalprice: number) {
        this.name=name;
        this.price=price;
        this.count=count;
        this.totalprice = totalprice;
    }

}