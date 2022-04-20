import { AxiosRequestHeaders } from "axios";

export default function authHeader(): AxiosRequestHeaders {
    const tokenStorage = localStorage.getItem('token');

    if (tokenStorage && tokenStorage.length > 0) {
        return { Authorization: 'Bearer ' + tokenStorage };
    } else {
        return {};
    }
}