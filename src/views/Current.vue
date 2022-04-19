<template>
  <div class="menu">
    <MenuList :show-not-ordered="false"></MenuList>
  </div>
</template>

<script>

import MenuList from "../components/MenuList";

export default {
  name: "CurrentOrderPage",
  components: {
    MenuList,
  },
};
</script>

<style scoped>

</style>