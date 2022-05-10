<template>
  <div class="order-display" v-if="isLoading">
    <h3>Loading..</h3>
  </div> 
  <div class="order-display" v-if="!isLoading">
    <hr size="3" width="85%"/>
    <div class="overview">
      <OrderList @totalPrice="getTotalPrice"></OrderList>
    </div>
    <hr size="3" width="85%"/>
    <div class="totalprice">
      <OrderPrice :totalPrice="totalPrice"></OrderPrice>
    </div>
    <div class="payment-buttons">
      <button class="btn btn-primary">Kassa betalen</button>
      <button class="btn btn-primary">Digitaal betalen</button>
    </div>

    <OrderList></OrderList>
  </div>
</template>

<script>
import MenuService from "@/services/menu.service";
import OrderService from "@/services/order.service";
import OrderList from "../components/OrderList.vue";
import OrderPrice from "../components/OrderPrice.vue";

import OrderList from "@/components/OrderList";

export default {
  name: "OrdersPage",
  components: {
    OrderList,
    OrderPrice
  },
  data: () => {
    return {
      isLoading: true,
      totalPrice: Number
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
  },
  methods: {
    getTotalPrice(value) {
      this.totalPrice = value;
    }
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