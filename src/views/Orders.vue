<template>
  <div class="order-display" v-if="isLoading">
    <h3>Loading..</h3>
  </div> 
  <div class="order-display" v-if="!isLoading">
    <h3>Loaded..</h3>

    <hr size="3" width="85%"/>
    <div class="overview">
      <OrderList></OrderList>
    </div>
    <hr size="3" width="85%"/>
    <div class="totalprice">
      <OrderPrice></OrderPrice>
    </div>

  </div>
</template>

<script>
import MenuService from "@/services/menu.service";
import OrderService from "@/services/order.service";
import OrderList from "../components/OrderList.vue";
import OrderPrice from "../components/OrderPrice.vue";

export default {
  name: "OrdersPage",
  components: {
    OrderList,
    OrderPrice
  },
  data: () => {
    return {
      isLoading: true,
    };
  },
  created() {
    MenuService.Load().then(() => {
      OrderService.LoadOrders().then(() => {
        this.isLoading = false;
      })
      .catch(error => {
        console.log(error);
      })
    })
    .catch(error => {
      console.log(error);
    })
  }
};
</script>

<style scoped>
.order-display {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.order-display td,
.order-display th {
  padding: 1px 8px;
}
.order-display td:first-of-type,
.order-display th:first-of-type {
  padding-right: 162px;
  padding-top: 3px;
}
.order-display td:last-of-type,
.order-display th:last-of-type {
  padding-left: 52px;
}
.order-display td:first-of-type, .order-display th:first-of-type {
  float: left;
}
.order-display tr {
  background-color: #bbbbbb8c;
}
.order-display table {
  padding: 10px;
  width: 100%;
  border-collapse: initial;
}
.order-display .payment-buttons {
  margin-top: 8px;
}
.order-display .payment-buttons button:first-of-type {
  margin-right: 38px;
}
.order-display .overview {
  margin-bottom: 6px;
  margin-top: 6px;
}
</style>