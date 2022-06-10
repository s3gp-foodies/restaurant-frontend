<template>
  <div class="login">
    <hr size="3" width="85%"/>
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

    <!-- temporarily login status shown -->
    <div class="section">
      &nbsp;
      <p>Logged in: {{ this.loginStatus }}</p>
    </div>
  </div>
</template>

<script>
import User from "../models/user";

export default {
  name: "LoginPage",
  data: () => {
    return {
      user: new User("table1", "Passw0rd!"),
      loginStatus: false
    };
  },
  inject:
      ['accountService'],
  methods: {
    handleLogin() {
      this.accountService.Login(this.user).then(res => {
        if (res) localStorage.setItem('loginstatus', true), alert("Login successful")
        this.loginStatus = localStorage.getItem('loginstatus');

        //if (res) this.$router.push({path: 'menu'})     
      }); 
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