import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://localhost:7209/api/Account/login';

class UserService {
    GetGroupName() {
        return axios.get(API_URL, { headers: authHeader() });
    }
}

export default new UserService();