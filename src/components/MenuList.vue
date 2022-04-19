<template v-if="!isLoading">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <div v-for="category in categories" :key="category">
    <MenuCategory :category="category" :categoryItems="menuPerCategory[category.id]"></MenuCategory>
  </div>
</template>

<!-- <img v-if="dish.imgLink == null" class="foodImage" src="https://www.martijnkardol.nl/wp-content/uploads/2021/07/placeholder-5.png">
          <img v-else class="foodImage" :src="dish.imgLink" alt=""> -->

<script>
// import axios from "axios";
// import authHeader from "@/helpers/auth-header";
import menuService from "@/services/menu.service";
import MenuCategory from "@/components/MenuCategory";

export default {
  name: "MenuList",
  components: {MenuCategory},
  data: () => {
    return {
      isLoading: true,
      isHidden: false,
      categories: [],
      menuPerCategory: {}
    }
  },

  created() {
    menuService.Load().then(() => {
      this.categories = menuService.GetCategories();
      this.categories.forEach(cat => {
        this.menuPerCategory[cat.id] = (menuService.GetItemsInCategory(cat))
      })
      this.isLoading = false;
    })
  }
}

</script>

<style scoped>


</style>