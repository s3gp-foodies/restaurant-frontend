import { AxiosRequestHeaders } from "axios";

export default function authHeader(): AxiosRequestHeaders {
    const tokenStorage = localStorage.getItem('token');

    if (tokenStorage && tokenStorage.length > 0) {
        const token = JSON.parse(tokenStorage);
        return { Authorization: 'Bearer ' + token };
    } else {
        return {};
    }
}