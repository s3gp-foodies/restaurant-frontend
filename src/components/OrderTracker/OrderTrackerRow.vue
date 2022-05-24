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
  },
  watch: {
    order: {
      deep: true,

      handler(orderList) {
        this.changedRow(orderList, "Submitted")
      }
    },
    inProgress: {
      deep: true,

      handler(orderList) {
        this.changedRow(orderList, "InProgress")
      }
    },
    done: {
      deep: true,

      handler(orderList) {
        this.changedRow(orderList, "Complete")
      }
    }
  },
  methods: {
    changedRow(itemList, updateStatus) {
      for(let i = 0; i < itemList.length; i++) {
        itemList[i].status = updateStatus;
      }
    },
  }
}
</script>

<style scoped>

</style>