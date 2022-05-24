<template>
  <div class="menu">
    <MenuList :show-not-ordered="false"></MenuList>
  </div>
  <button type="button" class="btn btn-primary" @click="AddOrder">Bestel</button>
</template>

<script>

import MenuList from "../components/Menu/MenuList";


export default {
  name: "CurrentOrderPage",
  components: {
    MenuList,
  },
  inject:['orderService'],
  methods: {
    AddOrder(){
      this.orderService.MakeOrder()
    }
  }
};
</script>

<style scoped>

</style>