import User from '@/models/user';
import axios from 'axios';

const API_URL = 'https://localhost:7209/api/account/';

class AccountService {
    Login(user: User) {
        return axios
            .post(API_URL + "login", user)
            .then((response) => {
                localStorage.userId = response.data.id;
                localStorage.userName = response.data.userName;
                localStorage.token = response.data.token;
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export default new AccountService();