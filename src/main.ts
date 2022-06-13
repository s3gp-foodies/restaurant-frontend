import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import * as VeeValidate from 'vee-validate';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import axiosRequestInterceptors from "@/interceptors/axios-request-interceptors";
import Toast, {POSITION} from "vue-toastification";
import "vue-toastification/dist/index.css";
import {store} from "@/store/store";

library.add(fas);

axiosRequestInterceptors()

const app = createApp(App).component('FontAwesomeIcon', FontAwesomeIcon).use(router, VeeValidate)

app.config.globalProperties.loginStatus = localStorage.loginStatus;

app.use(Toast, {
    position: POSITION.BOTTOM_RIGHT,
    timeout: 3000
});

app.use(store)

app.mount('#app');