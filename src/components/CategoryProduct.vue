<template>
  <tr>
    <td>{{ overview_product.name }}</td>
    <td>{{ overview_product.count }} x &euro;&thinsp;{{ parseFloat(overview_product.price).toFixed(2) }}</td>
    <td>&euro;&thinsp;{{ parseFloat(overview_product.totalPrice).toFixed(2) }}</td> 
  </tr>
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