<template>

  <router-link 
    v-if="this.loginStatus == 'false'" 
    to="/" 
    class="nav-link">
    Login
  </router-link>

  <button 
    v-if="this.loginStatus == 'false'"
    @click="handleLogOut()"
    class="nav-link" >
    Logout
  </button>

</template>

<script>
export default {
  name: "LoginLogout",
  data: () => {
    return {
      loginStatus: 'false'
    };
  },
  methods: {
    handleLogOut() {
        let logOutConfirmation = confirm("Are you sure you want to log out?");

        if(logOutConfirmation) {
            alert("Logout successful");
        } else {
            alert("Logout canceled");
        }

        console.log(localStorage.token.toString())
    }
  }
};
</script>