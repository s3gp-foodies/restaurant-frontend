<template>

  <div class="nav justify-content-center">
    <router-link to="/" class="nav-link">Menu</router-link>&nbsp;
    <router-link to="/orders" class="nav-link">Overzicht Bestellingen</router-link>
    <router-link v-if="haha != null" to="/order" class="nav-link">Huidige Bestelling</router-link>
  </div>

  <router-view/>
</template>

<script>

export default {
  name: 'App',
  mounted()
  {
    let haha = JSON.parse(sessionStorage.getItem("Test"))
    this.haha = haha
    console.log(haha)
  },
  data (){
    return{
      haha : {}
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.active {
  background: #bbb;
}
</style>
