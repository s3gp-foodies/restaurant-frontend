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
  </div>
</template>

<script>
import OrderList from "../components/AllOrdersOverview/OrderList.vue";
import OrderPrice from "../components/AllOrdersOverview/OrderPrice.vue";

export default {
  name: "OrdersPage",
  components: {
    OrderList,
    OrderPrice
  },
  data: () => {
    return {
      isLoading: false,
      totalPrice: 0
    };
  },
  inject: ['orderService', 'menuService'],
  created() {
    this.menuService.Load().then(() => {
      
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