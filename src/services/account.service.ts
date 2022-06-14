import User from '@/models/user';
import axios from 'axios';
import {SocketConsumer} from "@/services/socket-consumer";
import {store} from "@/store/store";

const API_URL = 'https://localhost:7209/api/account/';

class AccountService extends SocketConsumer {
    // Add websocket functions in this constructor
    Init(){
    }

    Login(user: User) {
        return axios
            .post(API_URL + "login", user)
            .then(async (response) => {
                localStorage.userId = response.data.id;
                localStorage.userName = response.data.userName;
                localStorage.token = response.data.token;         
                store.commit("SetLoginStatus", true);
                await this._socketService?.Connect()
                return true
            })
            .catch((error) => {
                console.log(error);
                return false
            });
    }

    Logout() {
        store.commit("SetLoginStatus", false);
        localStorage.clear();
        this._socketService?.Disconnect() 
    }

    HandleLogOut() {
        const logOutConfirmation = confirm("Are you sure you want to log out?");

        if(logOutConfirmation) {
            store.commit("SetLoginStatus", false);

            //clear all orders and totalprice..

            localStorage.clear();
            this._socketService?.Disconnect()  
            return true
        } else {  
            return false     
        }
    }

    CheckLoginStatus() {
        if(localStorage.token) {
            store.commit("SetLoginStatus", true);
        } else {
            store.commit("SetLoginStatus", false);
        }
    }
}

export default AccountService;