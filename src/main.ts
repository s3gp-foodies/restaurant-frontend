import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import VeeValidate from 'vee-validate';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

createApp(App).component('FontAwesomeIcon', FontAwesomeIcon).use(router, VeeValidate).mount('#app')