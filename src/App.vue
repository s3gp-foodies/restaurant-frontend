<template>
  <head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <title></title>
  </head>
  <SocketContainer></SocketContainer>
  <nav class="navbar nav-tabs" id="nav">
    <LoginLogout></LoginLogout> 
    <router-link to="/menu" class="nav-link">Menu</router-link>
    <router-link to="/current" class="nav-link">Current Order</router-link>
    <router-link to="/orders" class="nav-link">Order Overview</router-link>
    <router-link to="/dish-overview" class="nav-link">Employee Dishes Overview</router-link>
  </nav>
  <router-view/>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import AccountService from "@/services/account.service";
import MenuService from "@/services/menu.service";
import OrderService from "@/services/order.service";
import SocketContainer from "@/components/SocketContainer.vue";
import LoginLogout from "@/components/LoginLogout.vue";

@Options({
  components: {SocketContainer, LoginLogout},
  provide: {
    accountService: new AccountService(),
    menuService: new MenuService(),
    orderService: new OrderService(),
  }
})

export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5px;
  margin-bottom: 5px;
}

.navbar {
  background: #f8f8f8;
}
</style>
