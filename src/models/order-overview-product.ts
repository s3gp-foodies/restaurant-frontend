export default class OrderOverviewProduct {
    id: number;
    name: string;
    price: number;
    count: number;
    totalPrice: number;

    constructor(id: number, name: string, price: number, count: number, totalPrice: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.count = count;
        this.totalPrice = totalPrice;
    }

}