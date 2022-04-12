import Allergy from "./allergy";
import Category from "./category";

export default class Product {
  id: Number;
  name: string;
  price: Number;
  description: string;
  category: Category;
  alleries: Allergy[];

  constructor(id: Number, name: string, price: Number, description: string, category: Category, alleries: Allergy[]) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.category = category;
    this.alleries = alleries;
  }
}