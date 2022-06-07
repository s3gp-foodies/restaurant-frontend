<template>
  <h2>Orders that came in</h2>
  <p> Interact with the the element by dragging them across the screen </p>

  <div class="wrapper">
    <div style="display: flex; justify-content: center">
      <div class="menuIcons card text-white bg-dark">
        <font-awesome-icon class="fa-lg fa-2x" icon="bowl-food"/>
        Appetisers
      </div>
      <br>
      <div class="menuIcons card text-white bg-dark">
        <font-awesome-icon class="fa-lg fa-2x" icon="drumstick-bite"/>
        Main dish
      </div>
      <br>
      <div class="menuIcons card text-white bg-dark">
        <font-awesome-icon class="fa-lg fa-2x" icon="ice-cream"/>
        Dessert
      </div>
      <br>
      <div class="menuIcons card text-white bg-dark">
        <font-awesome-icon class="fa-lg fa-2x" icon="bottle-droplet"/>
        Drinks
      </div>
    </div>
    <i>Types of orders that you can encounter</i>
  </div>
  <table style="margin-top: 10px; table-layout: fixed" class="table table-bordered table-info">
    <thead class="thead-dark">
    <tr>
      <th style="width: 80px">Table Number</th>
      <th style="width: 80px" aria-sort="descending">Time</th>
      <th>New</th>
      <th>In Progress</th>
      <th>Done</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="order in orders_import" :key="order.tableId">
      <order-tracker-row :order="order"></order-tracker-row>
    </tr>
    </tbody>
  </table>
</template>

<script>

//let orders_import = [];
import OrderTrackerRow from "@/components/OrderTracker/OrderTrackerRow";
import { store } from "@/store/store";

export default {
  name: "OrderTracker",
  inject: ['orderService'],
  data: () => {
    return {
      //orders_import: orders_import
    }
  },
  components: {
    OrderTrackerRow
  },
  computed:  {
    orders_import() {
      return store.getters.GetAllOrders
    }
  },
  created() {
    let orderLength = store.getters.GetAllOrders.length

    if(orderLength === 0 || orderLength == null) {
      this.orderService.getPanelOrders();
    }
  },
}


</script>

<style scoped>
.table {
  min-height: 10px;
}

.menuIcons {
  min-width: 100px;
  max-width: 200px;
  margin: 5px;
  padding: 7px;
}

.wrapper {
  text-align: center;
}

.wrapper ul {
  display: inline-block;
  margin: 0;
  padding: 0;
  /* For IE, the outcast */
  zoom: 1;
  *display: inline;
}

.wrapper li {
  float: left;
  padding: 2px 5px;
}
</style>