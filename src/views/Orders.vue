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
import fullMenu from '../temp/backendMenu.json'
import { ordersCalculations } from '../helpers/ordersHelper.ts'
import ProductOrder from '@/models/productorder'
import Order from '@/models/order'
//import Menu from '@/models/menu'

export default {
  name: 'OrdersPage',
  data: () => {
    return {
      data: orders,
      fullMenu
    }
  },
  props: {
    orders: Array
  },
  created() {
    // added ordered products 
    var product_order_1 = new ProductOrder(5, 3); // 3*Cheesecake
    var product_order_2 = new ProductOrder(1, 4); // 4*Fruit Punch
    var product_order_3 = new ProductOrder(3, 2); // 2*T-Bone Steak

    // added orders with ordered products
    var order_1 = new Order(0, '01:10' , [product_order_1, product_order_3]);
    var order_2 = new Order(1, '02:10' , [product_order_2]);

    // find ordered products ids and amounts in order1
    console.log("find ordered products ids and amounts in order1");
    order_1['products'].forEach((ordered_product) => {
      console.log(ordered_product.productid + " | " + ordered_product.count);
    });

    // find ordered products ids and amounts in order2
    console.log("find ordered products ids and amounts in order2");
    order_2['products'].forEach((ordered_product) => {
      console.log(ordered_product.productid + " | " + ordered_product.count);
    });

    // find ids and names from all products
    console.log("find ids and names from all products");
    fullMenu.forEach((product) => {
      console.log(product.id + " | " + product.name);
    });

    //find products in menu from ordered products
    

    // added menu with products
    //var orderedMenu = new Menu([products_1, products_2]);
    //console.log(OrderedMenu);



    //temporary
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