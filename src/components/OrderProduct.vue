<template>
  <tr v-for="product in order.products" :key="product">
    <td>{{ product.name }}</td>
    <td>{{ product.count }} x &euro;&thinsp;{{ parseFloat(product.price).toFixed(2) }}</td>
    <td>&euro;&thinsp;{{ parseFloat(product.totalPrice).toFixed(2) }}</td>
  </tr>
</template>

<script>
export default {
  name: "OrderProduct",
  data: () => {
    return {
      
    }
  }
}
</script>

<style scoped>
</style>