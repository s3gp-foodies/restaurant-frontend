<template>
  <div class="menu">
    <MenuList :show-not-ordered="true"></MenuList>
  </div>
</template>

<script>
import MenuList from "../components/Menu/MenuList";
import {store} from "@/store/store";

export default {
  name: "MenuItem",
  components: {
    MenuList,
  },
  created() {
    //moet true blijven na succesvol login en refresh pagina
    console.log(store.getters.GetEmployeeLoginStatus);
  }
};
</script>

<style scoped>
body {
  margin: 0;
}

</style>