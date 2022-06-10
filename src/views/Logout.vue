<template>
  <div class="logout">
    <hr size="3" width="85%"/>
    <div class="panel">
      <form action="#" @submit.prevent="handleLogout">
        <div class="section">
          <button type="logout">Logout</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogoutPage",
  methods: {
    handleLogout() {
      localStorage.setItem('loginstatus', false)
      this.$router.push({path: '/'}) 
    }
  },
};
</script>

<style scoped>
.logout hr {
  margin: 24px auto;
}

.logout.panel {
  margin-top: 300px;
}

.logout form {
  display: block;
  margin: auto;
  border: 1px solid black;
  width: 270px;
  padding: 15px 20px;
}

.logout .section:not(:first-of-type),
.loginpage input {
  margin-top: 10px;
}
</style>