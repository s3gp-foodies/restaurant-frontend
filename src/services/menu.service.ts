import Category from '@/models/category';
import Menu from '@/models/menu';
import Product from '@/models/product';
import axios from 'axios';
import authHeader from '../helpers/auth-header';

const API_URL = 'https://localhost:7209/api/menuitem/';
const menu : Menu = new Menu([]);

class MenuService {
    
    GetItem(id: number){
        return menu.products.find(p => p.id == id);
    }

    GetMenu(){
        return menu;
    }

    async LoadMenu() {
        await axios.get(API_URL, { headers: authHeader() }).then(response =>{
           response.data.forEach((prod: any) => {
               menu.products.push(<Product>({
                name:prod.title,
                id : prod.id,
                description:prod.description,
                price:prod.price,
                allergies:prod.allergy,
                //TODO: Categories los opbouwen en
                category: new Category(prod.category.id, prod.category.name)
            }));
           });
        }).catch(error => {
            console.log(error)
        });
        return menu;
    }
}

export default new MenuService();