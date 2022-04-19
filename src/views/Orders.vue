<template>
  <div class="order-display">
    <hr size="3" width="85%"/>
    <div class="overview" v-if="!isFetching">
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
    <div class="payment-buttons">
      <button class="btn btn-primary">Kassa betalen</button>
      <button class="btn btn-primary">Digitaal betalen</button>
    </div>
  </div>
</template>

<script>
import OrderProduct from "@/models/order-product.ts";
import Order from "@/models/order.ts";
import MenuService from "@/services/menu.service";
import OrderOverviewProduct from "@/models/order-overview-product.ts";
import OrderOverview from "@/models/order-overview.ts";

export default {
  name: "OrdersPage",
  data: () => {
    return {
      listedOrders: [],
      totalPrice: Number,
      isFetching: Boolean,
    };
  },
  created() {
    this.isFetching = true;
    menuService.Load().then(() => {
      this.loadData();
      this.isFetching = false;
    })
  },
  methods: {
    async loadData() {
      var product_order_1 = new OrderProduct(2, 1);
      var product_order_2 = new OrderProduct(2, 4);
      var product_order_3 = new OrderProduct(3, 2);
      var product_order_4 = new OrderProduct(4, 5);

      const order_1 = new Order(0, "01:10", [product_order_1, product_order_3, product_order_4]);
      const order_2 = new Order(1, "02:10", [product_order_2]);

      const orders = [];
      orders.push(order_1);
      orders.push(order_2);

      this.totalPrice = 0;

      orders.forEach((order) => {
        const product_listings = [];
        let totalPriceOrder = 0;
        order.products.forEach((orderedProduct) => {
          let product = menuService.GetProductById(orderedProduct.productId);
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