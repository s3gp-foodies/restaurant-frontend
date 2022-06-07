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
                      :groupName="order['tableId']+order['time']"></order-tracker-cell>
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
  inject: ['orderService'],
  components: {
    OrderTrackerCell
  },
  props: {
    order: {}
  },
  data: () => {
    return {
      inProgress: [],
      done: []
    }
  },
  watch: {
    order: {
      deep: true,

      handler(orderList) {
        this.changedRow(orderList, "submitted")
      }
    },
    inProgress: {
      deep: true,

      handler(orderList) {
        this.changedRow(orderList, "inprogress")
      }
    },
    done: {
      deep: true,

      handler(orderList) {
        this.changedRow(orderList, "complete")
      }
    }
  },
  methods: {
    changedRow(itemList, updateStatus) {
      if (itemList.length === undefined) {
        for (let i = 0; i < itemList['products'].length; i++) {
          if (itemList['products'][i].status !== updateStatus) {
            itemList['products'][i].status = updateStatus;
            this.orderService.updateItemStatus(itemList['products'][i].id, updateStatus)
          }

        }
      } else {
        for (let i = 0; i < itemList.length; i++) {
          if (itemList[i].status !== updateStatus) {
            itemList[i].status = updateStatus;
            this.orderService.updateItemStatus(itemList[i].id, updateStatus)
          }
        }
      }
      this.orderService.updateItemStatus()
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