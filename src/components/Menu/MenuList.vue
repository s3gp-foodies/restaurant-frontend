<template v-if="!isLoading">
  <div v-for="category in categories" :key="category">
    <MenuCategory :category="category" :categoryProducts="menuPerCategory[category.id]" :show-not-ordered="showNotOrdered"></MenuCategory>
  </div>
</template>

<!-- <img v-if="dish.imgLink == null" class="foodImage" src="https://www.martijnkardol.nl/wp-content/uploads/2021/07/placeholder-5.png">
          <img v-else class="foodImage" :src="dish.imgLink" alt=""> -->

<script>
import MenuCategory from "@/components/Menu/MenuCategory";

export default {
  name: "MenuList",
  components: {MenuCategory},
  props:{
    showNotOrdered: Boolean
  },
  data: () => {
    return {
      isLoading: true,
      isHidden: false,
      categories: [],
      menuPerCategory: {}
    }
  },
  inject:['menuService'],

  created() {
    this.menuService.Load().then(() => {
      this.categories = this.menuService.GetCategories();
      this.categories.forEach(cat => {
        this.menuPerCategory[cat.id] = (this.menuService.GetItemsInCategory(cat))
      })
      this.isLoading = false;
    })
  }
}

</script>

<style scoped>


</style>