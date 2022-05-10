<template>
  <div class="menu">
    <MenuList :show-not-ordered="true"></MenuList>
  </div>
</template>

<script>
import MenuList from "../components/MenuList";

export default {
  name: "MenuItem",
  components: {
    MenuList,
  },
};
</script>

<style scoped>
body {
  margin: 0;
}

</style>