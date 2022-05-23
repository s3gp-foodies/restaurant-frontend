<template>
  <td>{{ overview_product.name }}</td>
  <td>{{ overview_product.count }} x &euro;&thinsp;{{ parseFloat(overview_product.price).toFixed(2) }}</td>
  <td>&euro;&thinsp;{{ parseFloat(overview_product.totalPrice).toFixed(2) }}</td> 
</template>

<script>
export default {
  name: "CategoryProduct",
  props: {
    overview_product: [],
    category_id: Number
  },
  created() { 
    console.log();
  } 
};
</script>

<style scoped>
td {
  padding: 1px 8px;
}
td:first-of-type {
  width: 270px;
  padding-top: 9px;
}
td:last-of-type {
  padding-left: 52px;
}
tr {
  background-color: #bbbbbb8c;
}
</style>