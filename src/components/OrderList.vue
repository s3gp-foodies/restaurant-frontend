<template>
  <table v-for="order in listedOrders" :key="order">
    <OrderProduct></OrderProduct>
    <tr>
      <th>{{ order.time }}</th>
      <th></th>
      <th>&euro;&thinsp;{{ parseFloat(order.totalprice).toFixed(2) }}</th>
    </tr>
  </table>
</template>

<script>
import OrderProduct from './OrderProduct.vue';

export default {
  name: "OrderList",
  components: {
    OrderProduct
  },
  created() {
 
  } 
};
</script>