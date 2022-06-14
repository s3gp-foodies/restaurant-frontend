<template>

  <router-link 
    v-if="!this.loginStatus" 
    to="/" 
    class="nav-link">
    Login
  </router-link>

  <button 
    v-if="this.loginStatus"
    @click="handleLogOut"
    class="nav-link" >
    Logout
  </button>

</template>

<script>
export default {
  name: "LoginLogout",
  inject:
    ['accountService'],
  methods: {
    handleLogOut() {
      const logoutSuccesful = this.accountService.HandleLogOut()
      
      if(logoutSuccesful) {
        this.$router.push({path: '/'})
      }
    }
  },
  computed: {
    loginStatus() {
      return this.$store.getters.GetLoginStatus;
    }
  },
  created() {
    this.accountService.CheckLoginStatus()
  }
};
</script>