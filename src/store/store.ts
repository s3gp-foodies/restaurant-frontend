//@ts-nocheck
import {createStore} from "vuex";
import Menu from "@/models/menu";
import Product from "@/models/product";
import Category from "@/models/category";
import OrderTracker from "@/models/orderTrackerModels/orderTracker";
import Order from "@/models/order";

/**
 * Zie https://vuex.vuejs.org/guide/ voor details maar hier de basics:
 * 1. Iets opslaan: zet het in de state.
 *      Dit moet een initele waarde hebben en heeft geen goede TS ondersteuning.
 *      Ergens anders in de code kan je dan store.state.variable aanroepen om het op te halen
 * 2. Iets aanpassen: Maak een mutation functie aan. Deze krijgt de state en een object met parameters mee.
 *      Ergens anders in de code gebruik je die met store.commit("MutationName", {parameters})
 *      Zie menu.service.ts voor voorbeelden
 * 3. Iets ophalen dat niet een-op-een opgeslagen is: maak een getter aan die de gewenste gegeven berekent
 *      en returnt. Dit kan zonder parameters (zie GetCategorizedMenu) of met (zie GetProductById)
 *      Ergens anders in de code kan je deze dan gebruiken door store.getters.GetterName aan te roepen (zie MenuList)
 * REACTIVE:
 *      Vue ziet alleen dat iets veranders als het top niveau object in de store wordt aangepast.
 *      Als je dus een array hebt en die aanpast werkt dat. Als je een object hebt met daarin een array
 *      wordt het niet geupdate nadat je de array aanpast.
 *      Daarnaast moeten de waardes die je reactive wilt hebben in de "computed" van het component staan (niet data dus).
 *      Zie MenuList.vue voor hoe dat er uit moet zien om te werken
 */
export const store = createStore({
    state: {
        menu: new Menu([]),
        categories: [],
        orderTrackerData: <OrderTracker>[],
        loginStatus: false
    },
    mutations: {
        AddToMenu(state, product: Product) {
            state.menu.products.push(product)
        },
        AddToCategories(state, {id, name}) {
            const cat = new Category(id, name)
            state.categories.push(cat)
        },
        AddOrderDataByProperty(state, tableId, time, productList) {
            state.orderTrackerData.push(tableId, time, productList)

        },
        AddOrderData(state, order) {
            state.orderTrackerData.push(order)
        },
        AddOrder(state, order: Order){
            state.orders.push(order)
        },
        EmployeeLoginStatus(state, loginstatus: boolean) {
            this.state.loginStatus = loginstatus;
        }
    },
    getters: {
        GetProductById: (state) => (id: number) => {
            return state.menu.products.find(p => p.id === id);
        },
        GetItemsInCategory: (state) => (category: Category) => {
            return state.menu.products.filter(item => item.category.id === category.id)
        },
        GetCategory: (state) => (categoryId: number) => {
            return state.categories.find(cat => cat.id === categoryId)
        },
        // This is called way too many times but that's a vue 3.0 issue
        // caching doesn't work, will be fixed in 3.1
        GetCategorizedMenu(state) {
            const result = {}
            state.categories.forEach(category => {
                result[category.id] = state.menu.products.filter(item => item.category.id === category.id)
            })
            return result
        },
        GetOrderByTableId: (state) => (tableId: string) => {
            return state.orderTrackerData.find(order => order.id == tableId)
        },
        GetAllProductsFromAOrder: (state) => (tableId: string) => {
            return state.orderTrackerData.filter(order => order.id == tableId)
        },
        GetAllOrders(state) {
            const result = []
            state.orderTrackerData.forEach(x => {
                result.push(x)
            })
            return result;
        },
        GetEmployeeLoginStatus(state) {
            return state.loginStatus;
        } 
    }
})