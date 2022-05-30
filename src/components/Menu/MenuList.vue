<template v-if="!isLoading">
  <div v-for="category in categories" :key="category">
    <MenuCategory :category="category" :categoryProducts="menuPerCategory[category.id]"
                  :show-not-ordered="showNotOrdered"></MenuCategory>
  </div>
</template>

<!-- <img v-if="dish.imgLink == null" class="foodImage" src="https://www.martijnkardol.nl/wp-content/uploads/2021/07/placeholder-5.png">
          <img v-else class="foodImage" :src="dish.imgLink" alt=""> -->

<script>
import MenuCategory from "@/components/Menu/MenuCategory";
import {store} from "@/store/store";

export default {
  name: "MenuList",
  components: {MenuCategory},
  props: {
    showNotOrdered: Boolean
  },
  data: () => {
    return {
      isLoading: true,
      isHidden: false,
    }
  },
  computed: {
    categories() {
      return store.state.categories
    },
    menuPerCategory() {
      return store.getters.GetCategorizedMenu
    }
  },
  inject: ['menuService'],

  created() {
    this.menuService.Load().then(() => {
      this.isLoading = false;
    })
  }
}

</script>