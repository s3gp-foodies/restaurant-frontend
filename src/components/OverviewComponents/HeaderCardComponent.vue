<template>
  <div class="card-header" v-if="orderCategory === 'Appetiser'"><font-awesome-icon class="fa-xl fa-2x" icon="bowl-food" /> {{orderName}} x{{orderAmount}}</div>
  <div class="card-header" v-if="orderCategory === 'Main dish'"><font-awesome-icon class="fa-xl fa-2x" icon="drumstick-bite" /> {{orderName}} x{{orderAmount}}</div>
  <div class="card-header" v-if="orderCategory === 'Dessert'"><font-awesome-icon class="fa-xl fa-2x" icon="ice-cream" /> {{orderName}} x{{orderAmount}}</div>
  <div class="card-header" v-if="orderCategory === 'Drinks'"><font-awesome-icon class="fa-xl fa-2x" icon="bottle-droplet" /> {{orderName}} x{{orderAmount}}</div>
</template>

<script>
export default {
  name: "HeaderCardComponent",
  props: {
    orderName: {
      type: String,
      required: true
    },
    orderCategory: {
      type: String,
      required: true
    },
    orderAmount: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>

</style>