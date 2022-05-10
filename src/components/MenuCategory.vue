<template>
  <div class="divider" v-on:click="toggle()">
    <p class="dividerBarTxt">{{ category.name }}</p>
  </div>
  <div style="display: flex; flex-wrap: wrap; justify-content: center">
    <template v-for="product in categoryProducts" :key="product">
      <MenuCard style="flex-basis: 45%; min-width: 750px; max-width: 750px"
                v-if="showSection"
                :product="product"
                :show-not-ordered="showNotOrdered"
      ></MenuCard>
    </template>
  </div>
</template>

<script>
import Category from "@/models/category";
import MenuCard from "@/components/MenuCard";

export default {
  name: "MenuCategory",
  components: {MenuCard},
  props: {
    category: Category,
    categoryProducts: {},
    showNotOrdered: Boolean
  },
  data: () => {
    return {
      showSection: true
    }
  },
  methods: {
    toggle() {
      this.showSection = !this.showSection
    }
  }
}
</script>

<style scoped>

.dividerBarTxt {
  margin: 5px;
}

.divider {
  padding: 10px;
  color: #f2f2f2;
  margin: auto;
  width: 65%;
  border: #01192d 1px solid;
  background-color: #02315a;
}
</style>