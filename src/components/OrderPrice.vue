<template>
  <h4>Totaal: &euro;&thinsp;{{ parseFloat(totalPrice).toFixed(2) }}</h4>
</template>

<script>
export default {
  name: "OrderPrice",
  data: () => {
    return {
      
    }
  }
}
</script>