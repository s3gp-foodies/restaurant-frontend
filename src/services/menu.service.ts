import Category from '@/models/category';
import Menu from '@/models/menu';
import Product from '@/models/product';
import axios from 'axios';
import authHeader from '../helpers/auth-header';

const API_URL = 'https://localhost:7209/api/menu/';
const menu: Menu = new Menu([]);
const categories: Category[] = [];

class MenuService {

    GetProductById(id: number) {
        return menu.products.find(p => p.id == id);
    }

    GetMenu() {
        return menu;
    }

    GetCategories() {
        return categories
    }

    GetItemsInCategory(category: Category){
        return menu.products.filter(item => item.category.id===category.id)
    }

    async Load() {
        if (categories.length === 0) {
            await this.LoadCategories()
        }
        if (menu.products.length === 0) {
            await this.LoadMenu();
        }
    }

    private async LoadMenu() {
        await axios.get(API_URL, {headers: authHeader()}).then(response => {
            response.data.forEach((prod: any) => {
                menu.products.push(<Product>({
                    name: prod.title,
                    id: prod.id,
                    description: prod.description,
                    price: prod.price,
                    allergies: prod.allergy,
                    photoUrl: prod.imageUrl,
                    category: categories.find(cat => cat.id === prod.category.id)
                }));
            });
        }).catch(error => {
            console.log(error)
        });
    }

    private async LoadCategories() {
        axios.get(API_URL + "categories", {headers: authHeader()}).then(response => {
            response.data.forEach((category: any) => {
                categories.push(<Category>({
                    name: category.name,
                    id: category.id
                }));
            });
        }).catch(error => {
            console.log(error)
        });
    }
}

export default new MenuService();