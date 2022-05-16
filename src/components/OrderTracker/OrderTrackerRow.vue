<template>
  <td>
    {{ order.name }}
  </td>
  <td>
    {{ order.time }}
  </td>
  <order-tracker-cell :products="order['product']" :order-name="order['name']"
                           :groupName="order['name']+order['time']" ></order-tracker-cell>
  <order-tracker-cell :products="inProgress" :order-name="order['name']"
                           :groupName="order['name']+order['time']"></order-tracker-cell>
  <order-tracker-cell :products="done" :order-name="order['name']"
                           :groupName="order['name']+order['time']"></order-tracker-cell>
</template>

<script>
import OrderTrackerCell from "@/components/OrderTracker/OrderTrackerCell";

export default {
  name: "OrderTrackerRow",
  components: {
    OrderTrackerCell
  },
  props: {
    order: {}
  },
  data: () => {
    return {
      inProgress:[],
      done:[]
    }
  }
}
</script>

<style scoped>

</style>