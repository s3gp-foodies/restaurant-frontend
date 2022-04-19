<template>
  <div class="order-display">
    <hr size="3" width="85%" />
    <div class="overview" v-if="!is_fetching">
      <table v-for="order in order_listings" :key="order">
        <tr v-for="product in order.products" :key="product">
          <td>{{ product.name }}</td>
          <td>{{ product.count }} x &euro;&thinsp;{{ parseFloat(product.price).toFixed(2) }}</td>
          <td>&euro;&thinsp;{{ parseFloat(product.totalprice).toFixed(2) }}</td>
        </tr>
        <tr>
          <th>{{ order.time }}</th>
          <th></th>
          <th>&euro;&thinsp;{{ parseFloat(order.totalprice).toFixed(2) }}</th>
        </tr>
      </table>
    </div>
    <hr size="3" width="85%" />
    <div class="totalprice">
      <h4>Totaal: &euro;&thinsp;{{ parseFloat(totalprice).toFixed(2) }}</h4>
    </div>
    <div class="payment-buttons">
      <button class="btn btn-primary">Kassa betalen</button>
      <button class="btn btn-primary">Digitaal betalen</button>
    </div>
  </div>
</template> 

<script>
import ProductOrder from "@/models/productorder.ts";
import Order from "@/models/order.ts";
import menuService from "@/services/menu.service";
import OrderListingProduct from "@/models/order_listing_product.ts";
import OrderListing from "@/models/order_listing.ts";

export default {
  name: "OrdersPage",
  data: () => {
    return {
      order_listings: [],
      totalprice: Number,
      is_fetching: Boolean,
    };
  },
  created() {
    this.is_fetching = true;
    this.loadData().then(this.is_fetching=false);
  },
  methods: {
    async loadData() {
      var product_order_1 = new ProductOrder(2, 1); 
      var product_order_2 = new ProductOrder(4, 4); 
      var product_order_3 = new ProductOrder(3, 2); 
      var product_order_4 = new ProductOrder(4, 5); 

      var order_1 = new Order(0, "01:10", [product_order_1, product_order_3, product_order_4]);
      var order_2 = new Order(1, "02:10", [product_order_2]);

      var orders = [];
      orders.push(order_1);
      orders.push(order_2);

      await menuService.LoadMenu();

      this.totalprice = 0;

      orders.forEach((order) => {
        var product_listings = [];
        var totalprice_order = 0;

        order.products.forEach((ordered_product) => {
          var product = menuService.GetItem(ordered_product.productid);

          product_listings.push(
            new OrderListingProduct(
              product.name,
              product.price,
              ordered_product.count,
              product.price * ordered_product.count
            )
          );
          
          totalprice_order += product.price * ordered_product.count;
        });

        this.order_listings.push(
          new OrderListing(order.time, totalprice_order, product_listings)
        );

        this.totalprice += totalprice_order;
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
  padding-top: 1px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 1px;
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
.order-display td:first-of-type {
  float: left;
}
.order-display tr {
  background-color: #bbbbbb8c;
}
.order-display table {
  padding: 10px;
  width: 100%;
}
.order-display table:first-of-type {
  margin-bottom: 16px;
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