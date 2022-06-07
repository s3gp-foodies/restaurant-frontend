import Product from '@/models/product';
import axios from 'axios';
import authHeader from '../helpers/auth-header';
import {SocketConsumer} from "@/services/socket-consumer";
import {store} from "@/store/store";

const API_URL = 'https://localhost:7209/api/menu/';

class MenuService extends SocketConsumer {
    // Add websocket functions in this constructor
    Init() {

    }

    async Load() {
        console.log('2: menu.service.load | async');

        if (store.state.categories.length === 0) {
            await this.LoadCategories()

            console.log('3.1: menu.service.loadcategories() | await');
        }
        if (store.state.menu.products.length === 0) {
            await this.LoadMenu();

            console.log('3.2: menu.service.loadmenu() | await');
        }
    }

    private async LoadMenu() {
        console.log('4.2: menu.service.loadmenu() | async');

        await axios.get(API_URL, {headers: authHeader()}).then(response => {
            console.log('5.2: menu.service.axiosgetmenu | await');

            response.data.forEach((prod: any) => {
                store.commit("AddToMenu", <Product>({
                    name: prod.title,
                    id: prod.id,
                    description: prod.description,
                    price: prod.price,
                    allergies: prod.allergy,
                    photoUrl: prod.imageUrl,
                    category: store.getters.GetCategory(prod.category.id)
                }));
            });
        }).catch(error => {
            console.log(error)
        });
    }

    private async LoadCategories() {
        console.log('4.1: menu.service.loadcategories() | async');

        axios.get(API_URL + "categories", {headers: authHeader()}).then(response => {
            console.log('5.1: menu.service.axiosgetcategories | await');

            response.data.forEach((category: any) => {
                store.commit("AddToCategories", {id: category.id, name: category.name})
            });
        }).catch(error => {
            console.log(error)
        });
    }
}

export default MenuService;