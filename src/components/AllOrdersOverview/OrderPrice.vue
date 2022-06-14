<template>
  <h4>Total: &euro;&thinsp;{{ parseFloat(totalPrice).toFixed(2) }}</h4>
</template>

<script>
export default {
  name: "OrderPrice",
  props: {
    totalPrice: Number
  }
}
</script>