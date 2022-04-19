<template>
  <div class="divider" v-on:click="toggle()">
    <p class="dividerBarTxt">{{ category.name }}</p>
  </div>
  <template v-for="item in categoryItems" :key="item" >
    <MenuCard
        v-show="showSection"
        :name="item.name"
        :photo="null"
        :description="item.description"
        :price="item.price"
    ></MenuCard>
  </template>
</template>

<script>
import Category from "@/models/category";
import MenuCard from "@/components/MenuCard";

export default {
  name: "MenuCategory",
  components: {MenuCard},
  props: {
    category: Category,
    categoryItems: {}
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