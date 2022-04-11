<template>
  <div class="orders">
    <hr size="3" width="85%">  
    <div class="overview">
      <table v-for="order in data['orders']" :key="order">
        <tr v-for="product in order['product']" :key="product">
          <td>{{ product.name }}</td>
          <td>{{ product.amount }} x &euro;&thinsp;{{ product.price }}</td>
          <td>&euro;&thinsp;{{ product.totalprice }}</td>
        </tr>
        <tr>
          <th>{{ order.name }}</th>
          <th></th>
          <th>&euro;&thinsp;{{ order.totalprice }}</th>
        </tr>
      </table>
    </div>
    <hr size="3" width="85%">  
    <div class="totalprice">
      <h4>Totaal: &euro;&thinsp;{{ data['orders'].totalprice }}</h4>
    </div>
    <div class="payment-buttons">
      <button class="btn btn-primary">Kassa betalen</button>
      <button class="btn btn-primary">Digitaal betalen</button>
    </div>
  </div>
</template> 

<script>
import orders from '../temp/orders.json'
import { ordersCalculations } from '../helpers/ordersHelper.ts'

export default {
  name: 'OrdersPage',
  data: () => {
    return {
      data: orders,
    }
  },
  props: {
    orders: Array
  },
  created() {
    this.data['orders'] = ordersCalculations.multiplyPriceTotalProduct(this.data['orders']);
    this.data['orders'] = ordersCalculations.addPriceTotalOrder(this.data['orders']);
    this.data['orders'] = ordersCalculations.addPriceTotalOrders(this.data['orders']); 
  }
}
</script>

<style scoped>
.orders {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.orders td, .orders th {
  padding-top: 1px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 1px;
}
.orders td:first-of-type, .orders th:first-of-type {
  padding-right: 162px;
  padding-top: 3px;
}
.orders td:last-of-type, .orders th:last-of-type {
  padding-left: 52px;
}
.orders td:first-of-type {
  float: left;
}
.orders tr {
  background-color: #bbbbbb8c;
}
.orders table {
  padding: 10px;
}
.orders table:first-of-type {
  margin-bottom: 16px;
}
.orders .payment-buttons {
  margin-top: 8px;
}
.orders .payment-buttons button:first-of-type {
  margin-right: 38px;
}
.orders .overview {
  margin-bottom: 6px;
  margin-top: 6px;
}
</style>