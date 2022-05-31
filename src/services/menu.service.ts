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
        if (store.state.categories.length === 0) {
            await this.LoadCategories()
        }
        if (store.state.menu.products.length === 0) {
            await this.LoadMenu();
        }
    }

    private async LoadMenu() {
        console.log("Loading Menu")
        await axios.get(API_URL, {headers: authHeader()}).then(response => {
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
        axios.get(API_URL + "categories", {headers: authHeader()}).then(response => {
            response.data.forEach((category: any) => {
                store.commit("AddToCategories", {id: category.id, name: category.name})
            });
        }).catch(error => {
            console.log(error)
        });
    }
}

export default MenuService;