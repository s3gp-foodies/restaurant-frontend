import Allergy from "./allergy";
import Category from "./category";

export default class Product {
    id: Number;
    name: string;
    price: Number;
    description: string;
    photoUrl: string;
    category: Category;
    allergies: Allergy[];

    constructor(id: Number, name: string, price: Number, description: string, photoUrl: string, category: Category, allergies: Allergy[]) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.photoUrl = photoUrl;
        this.category = category;
        this.allergies = allergies;
    }
}