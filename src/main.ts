import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import VeeValidate from 'vee-validate';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {
    faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import axiosRequestInterceptors from "@/interceptors/axios-request-interceptors";
import Toast, {POSITION} from "vue-toastification";
import "vue-toastification/dist/index.css";


library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt);

axiosRequestInterceptors()

const app = createApp(App).component('FontAwesomeIcon', FontAwesomeIcon).use(router, VeeValidate)

app.use(Toast, {
    position: POSITION.BOTTOM_RIGHT,
    timeout: 3000
});

app.mount('#app');