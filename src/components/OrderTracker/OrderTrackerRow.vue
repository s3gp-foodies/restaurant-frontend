<template>
  <td>
    {{ order.tableId }}
  </td>
  <td>
    {{
     moment(order.time)
    }}
  </td>
  <order-tracker-cell :products="order['products']" :order-name="order['tableId']"
                           :groupName="order['tableId']+order['time']" ></order-tracker-cell>
  <order-tracker-cell :products="inProgress" :order-name="order['tableId']"
                           :groupName="order['tableId']+order['time']"></order-tracker-cell>
  <order-tracker-cell :products="done" :order-name="order['tableId']"
                           :groupName="order['tableId']+order['time']"></order-tracker-cell>
</template>

<script>
import OrderTrackerCell from "@/components/OrderTracker/OrderTrackerCell";
import moment from 'moment/moment'

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
        console.log(orderList)
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

    //uses https://www.npmjs.com/package/vue-moment
    moment(date) {
      return moment(date).format('MMMM Do, h:mm:ss a');
    }
  }
}
</script>

<style scoped>

</style>