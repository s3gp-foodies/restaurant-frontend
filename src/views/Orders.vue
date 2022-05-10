<template>
  <div class="order-display" v-if="isLoading">
    <h3>Loading..</h3>
  </div>
  
  <div class="order-display" v-if="!isLoading">
    <hr size="3" width="85%"/>

    <div class="overview">
      <table v-for="order in listedOrders" :key="order">
        <tr v-for="product in order.products" :key="product">
          <td>{{ product.name }}</td>
          <td>{{ product.count }} x &euro;&thinsp;{{ parseFloat(product.price).toFixed(2) }}</td>
          <td>&euro;&thinsp;{{ parseFloat(product.totalPrice).toFixed(2) }}</td>
        </tr>
        <tr>
          <th>{{ order.time }}</th>
          <th></th>
          <th>&euro;&thinsp;{{ parseFloat(order.totalprice).toFixed(2) }}</th>
        </tr>
      </table>
    </div>

    <hr size="3" width="85%"/>

    <div class="totalprice">
      <h4>Totaal: &euro;&thinsp;{{ parseFloat(totalPrice).toFixed(2) }}</h4>
    </div>

  </div>
</template>

<script>
import MenuService from "@/services/menu.service";
import OrderService from "@/services/order.service";
import OrderOverviewProduct from "@/models/order-overview-product.ts";
import OrderOverview from "@/models/order-overview.ts";

export default {
  name: "OrdersPage",
  data: () => {
    return {
      listedOrders: [],
      totalPrice: Number,
      isLoading: true,
    };
  },
  created() {
    MenuService.Load().then(() => {
      OrderService.LoadOrders().then(() => {
        this.loadData();
        this.isLoading = false;
      })
    })
  },
  methods: {
    async loadData() {
      this.totalPrice = 0;

      OrderService.GetOrders().orders.forEach((order) => {
        const product_listings = [];
        let totalPriceOrder = 0;

        order.products.forEach((orderedProduct) => {
          let product = MenuService.GetProductById(orderedProduct.productId);

          product_listings.push(
              new OrderOverviewProduct(
                  product.name,
                  product.price,
                  orderedProduct.count,
                  product.price * orderedProduct.count
              )
          );

          totalPriceOrder += product.price * orderedProduct.count;
        });

        this.listedOrders.push(
            new OrderOverview(order.time, totalPriceOrder, product_listings)
        );

        this.totalPrice += totalPriceOrder;
      });
    },
  },
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