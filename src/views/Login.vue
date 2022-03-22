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
//import { websocketConnection } from '../services/websocketConnectionService.js'

export default {
  name: 'LoginPage',
  data: () => {
    return {
      username: ''
    }
  },
  created() {
    //websocketConnection.openWebsocketConnection();
  },  
  methods: {
    login(action) {
      const {username, password} = Object.fromEntries(new FormData(action.target));

      console.log('username:'+username);
      console.log('password:'+password);
    },
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