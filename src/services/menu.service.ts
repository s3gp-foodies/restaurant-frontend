import axios from 'axios';
import authHeader from '../helpers/auth-header';

const API_URL = 'https://localhost:7209/api/menu/';

class MenuService {
    GetMenu() {
        return axios.get(API_URL, { headers: authHeader() });
    }
}

export default new MenuService();