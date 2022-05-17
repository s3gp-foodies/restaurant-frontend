import axios from "axios";
import {useToast} from "vue-toastification";

export default function axiosRequestInterceptors() {
    const toast = useToast();
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        toast.error(error.message)
        return Promise.reject(error);
    });

}