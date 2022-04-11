import Alergy from "./algergy";
import Category from "./category";

export default class Product {
  id: Number;
  name: string;
  price: string;
  description: string;
  category: Category;
  alleries: Alergy[];

  constructor(id: Number, name: string, price: string, description: string, category: Category, alleries: Alergy[]) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.category = category;
    this.alleries = alleries;
  }
}