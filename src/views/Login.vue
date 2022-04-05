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
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

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
      const { username } = Object.fromEntries(new FormData(action.target));

      const data = {  
        userName: username,  
        password: 'Passw0rd!'
      };

      axios.post('https://localhost:7209/api/Account/login', data)
        .then(
          response => {
            localStorage.userName=response.data.userName;
            localStorage.token=response.data.token;
          }
        ).catch(
          error => {
            console.log(error);
          }
        )

    const connection = new HubConnectionBuilder()
      .withUrl('https://localhost:7209/hubs/table', {accessTokenFactory: ()=>localStorage.token})
      .configureLogging(LogLevel.Information)
      .build();
    connection.on("Connected",function (message) {
      console.log(message);
    }); 
    connection.start();
    
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