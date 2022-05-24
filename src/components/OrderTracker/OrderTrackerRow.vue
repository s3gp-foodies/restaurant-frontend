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
import orderStatusEnum from "@/components/OrderTracker/orderStatusEnum"

let orderLength;

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
        this.checkRowChanges(orderList, "Submitted")
      }
    },
    inProgress: {
      deep: true,

      handler(orderList) {
        this.checkRowChanges(orderList, "In Progress")
      }
    },
    done: {
      deep: true,

      handler(orderList) {
        this.checkRowChanges(orderList, "Done")
      }
    }
  },
  methods: {
    checkRowChanges(rowList, rowStatus) {
      if(orderLength === undefined) {
        orderLength = rowList.product.length;
      } else if(orderLength <= rowList.product.length) {
        for(let i = 0; i < rowList.product.length; i++) {
          rowList.product[i].status = orderStatusEnum[rowStatus.valueOf()];
        }
        orderLength = rowList.product.length;
      }
    }
  }
}
</script>

<style scoped>

</style>