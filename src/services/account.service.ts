import User from '@/models/user';
import axios from 'axios';
import {SocketConsumer} from "@/services/socket-consumer";

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
                await this._socketService?.Connect()
                return true
            })
            .catch((error) => {
                console.log(error);
                return false
            });
    }
}

export default AccountService;