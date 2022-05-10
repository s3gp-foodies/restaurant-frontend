<template>
  <td>
    {{ order.name }}
  </td>
  <td>
    {{ order.time }}
  </td>
  <dish-overview-component :products="order['product']" :order-name="order['name']"
                           :groupName="order['name']+order['time']" ></dish-overview-component>
  <dish-overview-component :products="inProgress" :order-name="order['name']"
                           :groupName="order['name']+order['time']"></dish-overview-component>
  <dish-overview-component :products="done" :order-name="order['name']"
                           :groupName="order['name']+order['time']"></dish-overview-component>
</template>

<script>
import dishOverviewComponent from "@/components/OverviewComponents/DishOverviewComponent";

export default {
  name: "DishOverviewRowComponent",
  components: {
    dishOverviewComponent
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