<template>
  <span v-for="category in categories" :key="category">
    <p>{{ category.name }}</p>
    <table v-for="order in listedOrders" :key="order">
      <CategoryProduct :order="order" :category_id="category.id"></CategoryProduct>
    </table>
  </span>
</template>

<script>
import CategoryProduct from './CategoryProduct.vue';
import OrderService from "@/services/order.service";
import OrderOverviewProduct from "@/models/order-overview-product.ts";
import OrderOverview from "@/models/order-overview.ts";
import MenuService from "@/services/menu.service";

export default {
  name: "OrderList",
  emits: ["totalPrice"],
  components: {
    CategoryProduct
  },
  data: () => {
    return {
      listedOrders: [],
      totalPrice: 0,
      categories: [],
      productIds: [],
      orderedProducts: []
    };
  },
  created() {
    this.categories = MenuService.GetCategories();

    OrderService.GetOrders().orders.forEach((order) => {
      let totalPriceOrder = 0;
      const product_listings = [];

      order.products.forEach((orderedProduct) => {
        this.productIds.push(orderedProduct.productId);
        this.orderedProducts.push(orderedProduct);
      });

      this.orderedProducts.forEach((orderedProduct1) => {
        this.checkDuplicateProductIds(this.productIds).forEach(duplicateProductId => {
          let product = MenuService.GetProductById(orderedProduct1.productId);

          if(duplicateProductId == orderedProduct1.productId) {
            console.log("duplicate");
            console.log(product);
            console.log(orderedProduct1.count);
          } else {
            console.log("unique");
            console.log(product);
            console.log(orderedProduct1.count);
          }
        });
      });  

      order.products.forEach((orderedProduct) => {
        let product = MenuService.GetProductById(orderedProduct.productId);

        product_listings.push(
          new OrderOverviewProduct(
            orderedProduct.productId,
            product.name,
            product.price,
            orderedProduct.count,
            product.price * orderedProduct.count
          )
        );

        totalPriceOrder += product.price * orderedProduct.count;
      });

      this.totalPrice += totalPriceOrder; 
      this.$emit("totalPrice", this.totalPrice);

      this.listedOrders.push(
        new OrderOverview(order.time, totalPriceOrder, product_listings)
      );
    });
  },
  methods: {
    checkDuplicateProductIds(numbers) {
      const set = new Set(numbers);

      const duplicates = numbers.filter(item => {
          if (set.has(item)) {
              set.delete(item);
          } else {
              return item;
          }
      });

      return duplicates;
    }
  } 
};
</script>

<style scoped>
table {
  padding: 10px;
  width: 100%;
  border-collapse: initial;
}
th {
  padding: 1px 8px;
}
th:first-of-type {
  padding-right: 162px;
  padding-top: 3px;
}
th:last-of-type {
  padding-left: 52px;
}
th:first-of-type {
  float: left;
}
tr {
  background-color: #bbbbbb8c;
}
</style>