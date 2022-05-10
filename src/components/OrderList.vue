<template>
  <table v-for="order in listedOrders" :key="order">
    <OrderProduct :order="order"></OrderProduct>
    <tr>
      <th>{{ order.time }}</th>
      <th></th>
      <th>&euro;&thinsp;{{ parseFloat(order.totalprice).toFixed(2) }}</th>
    </tr>
  </table>
</template>

<script>
import OrderProduct from './OrderProduct.vue';
import OrderService from "@/services/order.service";
import OrderOverviewProduct from "@/models/order-overview-product.ts";
import OrderOverview from "@/models/order-overview.ts";
import MenuService from "@/services/menu.service";

export default {
  name: "OrderList",
  components: {
    OrderProduct
  },
  data: () => {
    return {
      listedOrders: [],
    };
  },
  created() {
    OrderService.GetOrders().orders.forEach((order) => {
      let totalPriceOrder = 0;
      const product_listings = [];

      order.products.forEach((orderedProduct) => {
        let product = MenuService.GetProductById(orderedProduct.productId);

        product_listings.push(
          new OrderOverviewProduct(
            product.name,
            product.price,
            orderedProduct.count,
            product.price * orderedProduct.count
          )
        );

        totalPriceOrder += product.price * orderedProduct.count;
      });

      this.listedOrders.push(
        new OrderOverview(order.time, totalPriceOrder, product_listings)
      );
    });
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