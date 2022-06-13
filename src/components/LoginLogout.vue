<template>

  <router-link 
    v-if="0 == 0" 
    to="/" 
    class="nav-link">
    Login
  </router-link>

  <button 
    v-if="0 == 0"
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
      
    };
  },
  methods: {
    handleLogOut() {
        let logOutConfirmation = confirm("Are you sure you want to log out?");

        if(logOutConfirmation) {
          localStorage.loginStatus = 'false';

          alert("Logout successful");
        } else {     
          
          alert("Logout canceled");         
        }
    }
  }
};
</script>