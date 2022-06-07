<template>
  <table v-for="category in listedCategories" :key="category">
    <tr>
      <th colspan="6">{{ category.name }}</th>
    </tr>
    <tr
        v-for="overview_product in overviewProducts"
        :key="overview_product.id"
    >
      <CategoryProduct
          v-if="overview_product.id === category.id"
          :overview_product="overview_product"
      ></CategoryProduct>
    </tr>
  </table>
</template>

<script>
import CategoryProduct from "./CategoryProduct.vue";
import OrderOverviewProduct from "@/models/order-overview-product.ts";
import {store} from "@/store/store";

export default {
  name: "OrderList",
  emits: ["totalPrice"],
  components: {
    CategoryProduct,
  },
  data: () => {
    return {
      totalPrice: 0,
      orderedProducts: [],
      overviewProducts: [],
      listedCategories: [],
    };
  },
  inject: ["orderService", "menuService"],
  methods: {
    LoadProductList() {

      this.categories = store.state.categories;
      const orders = JSON.parse(JSON.stringify(this.orderService.GetOrders()));

      orders.forEach((order) => {
        order.products.forEach((orderedProduct) => {
          this.orderedProducts.push(orderedProduct);
        });
      });


      let groupedProducts = [];
      this.orderedProducts.forEach((prod) => {
        let set = false;

        groupedProducts.forEach((gp) => {
          if (gp.productId === prod.productId) {
            gp.count = gp.count + prod.count;
            set = true;
          }
        });
        if (!set) groupedProducts.push(prod);
      });

      groupedProducts.forEach((prod) => {
        const menuProduct = store.getters.GetProductById(prod.productId);

        if (typeof (menuProduct) !== 'undefined') {
          if (!this.listedCategories.includes(menuProduct.category))
            this.listedCategories.push(menuProduct.category);
          this.overviewProducts.push(
              new OrderOverviewProduct(
                  prod.productId,
                  menuProduct.name,
                  menuProduct.price,
                  prod.count,
                  prod.count * menuProduct.price
              )
          );

          this.totalPrice += this.overviewProducts[this.overviewProducts.length - 1].totalPrice;
        }
      });
      this.$emit("totalPrice", this.totalPrice);
    }
  },
};
</script>

<style scoped>
table:not(:last-of-type) {
  margin-bottom: 16px;
}

th {
  padding: 4px 0;
}

tr:first-of-type {
  border: 1px solid black;
}

tr {
  background-color: #bbbbbb8c;
}
</style>