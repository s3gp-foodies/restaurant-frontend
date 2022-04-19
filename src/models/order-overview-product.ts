export default class OrderOverviewProduct {
    name: string;
    price: number;
    count: number;
    totalPrice: number;

    constructor(name: string, price: number, count: number, totalPrice: number) {
        this.name = name;
        this.price = price;
        this.count = count;
        this.totalPrice = totalPrice;
    }

}