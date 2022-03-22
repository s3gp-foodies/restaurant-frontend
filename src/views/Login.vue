<template>
    <hr size="3" width="85%">  
  <div class="login">
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
export default {
  name: 'LoginPage'
}
</script>

<style scoped>
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