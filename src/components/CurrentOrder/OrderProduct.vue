<template>
  <tr v-for="product in order.products" :key="product">
    <td>{{ product.name }}</td>
    <td>{{ product.count }} x &euro;&thinsp;{{ parseFloat(product.price).toFixed(2) }}</td>
    <td>&euro;&thinsp;{{ parseFloat(product.totalPrice).toFixed(2) }}</td>
  </tr>
</template>

<script>
import Order from '@/models/order';

export default {
  name: "OrderProduct",
  props: {
    order: Order
  }
}
</script>

<style scoped>
td {
  padding: 1px 8px;
}
td:first-of-type {
  padding-right: 162px;
  padding-top: 3px;
}
td:last-of-type {
  padding-left: 52px;
}
td:first-of-type {
  float: left;
}
tr {
  background-color: #bbbbbb8c;
}
</style>