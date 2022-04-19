<template>
  <div id="nav">
    <router-link to="/" class="nav-link">Login</router-link>&nbsp;
    <router-link to="/menu" class="nav-link">Menu</router-link>&nbsp;
    <router-link to="/orders" class="nav-link">Overzicht Bestellingen</router-link>&nbsp;
    <router-link to="/order" class="nav-link">Huidige Bestelling</router-link>
    <router-link to="/dish-overview" class="nav-link"> Employee Dishes Overview</router-link>
    <!-- <router-link to="/testDrag" class="nav-link"> test Drag </router-link> -->
    <!-- <router-link to="/vueDrag" class="nav-link"> vueDraggable </router-link> -->
  </div>

  <router-view/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from './components/HelloWorld.vue';

@Options({
  components: {
    HelloWorld,
  },
})
export default class App extends Vue {}
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
</style>
