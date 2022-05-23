<template>
  <td colspan="2">{{ overview_product.name }}</td>
  <td colspan="2">{{ overview_product.count }} x &euro;&thinsp;{{ parseFloat(overview_product.price).toFixed(2) }}</td>
  <td colspan="2">&euro;&thinsp;{{ parseFloat(overview_product.totalPrice).toFixed(2) }}</td> 
</template>

<script>
export default {
  name: "CategoryProduct",
  props: {
    overview_product: [],
    category_id: Number
  } 
};
</script>

<style scoped>
td {
  padding: 6px 25px;
  width: 180px;
}
tr {
  background-color: #bbbbbb8c;
}
</style>