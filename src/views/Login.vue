<template> 
  <div class="login">
    <hr size="3" width="85%"> 
    <div class="panel">
      <form action="#" @submit.prevent="login">
        <div class="section">
          <label for="username">Username:</label>
          <input required type="text" name="username"/>  
        </div>
        <div class="section">
          <label for="password">Password:</label>
          <input required type="password" name="password"/>  
        </div>
        <div class="section">
          <button type="login">Login</button>
        </div>
      </form>
    </div>
  </div>
</template> 

<script>
import axios from 'axios';
import * as signalR from "@aspnet/signalr";

export default {
  name: 'LoginPage',
  data: () => {
    return {
      username: '',
      password: ''
    }
  },
  created() {
  },  
  methods: {
    login(action) {
      const {username, password} = Object.fromEntries(new FormData(action.target));

      const data = {  
        userName: username,  
        password: password
      };

      axios.post('https://localhost:7209/api/Account/login', data)
        .then(
          response => {
            console.log(response);

            const client = new signalR.HubConnectionBuilder()
              .withUrl(`https://localhost:7209/hubs/table`)
              .build();
            client.start().catch(err => console.error(err.toString()));
          }
        ).catch(
          error => {
            console.log(error);
          }
        )
    }
  }
}
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
  width: 250px;
  padding: 15px 5px;
}
.login .section:not(:first-of-type), .loginpage input {
  margin-top: 10px;
}
</style>