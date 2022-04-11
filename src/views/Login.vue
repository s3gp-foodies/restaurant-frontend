<template>
  <div class="login">
    <hr size="3" width="85%" />
    <div class="panel">
      <form action="#" @submit.prevent="handleLogin">
        <div class="section">
          <label>Username:</label>
          <input
            v-model="user.username"
            type="text"
            class="form-control"
            name="username"
            required
          />
        </div>
        <div class="section">
          <label>Password:</label>
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            name="password"
            required
          />
        </div>
        <div class="section">
          <button type="login">Login</button>
        </div>
      </form>
    </div>
  </div>
</template> 

<script>
import { HubConnectionBuilder } from "@microsoft/signalr";
import User from "../models/user";
import AccountService from '../services/account.service';

export default {
  name: "LoginPage",
  data: () => {
    return {
      user: new User("", "Passw0rd!"),
    };
  },
  methods: {
    handleLogin() {
      //api
      AccountService.Login(this.user);

      //websocket
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7209/hubs/table", {
          accessTokenFactory: () => localStorage.token,
        })
        .build();
      connection.on("Connected", function (message) {
        console.log(message);
      });
      connection.start();
    },
  },
};
</script>

<style scoped>
.login hr {
  margin: 24px auto;
}
.login.panel {
  margin-top: 300px;
}
.login form {
  display: block;
  margin: auto;
  border: 1px solid black;
  width: 270px;
  padding: 15px 20px;
}
.login .section:not(:first-of-type),
.loginpage input {
  margin-top: 10px;
}
</style>