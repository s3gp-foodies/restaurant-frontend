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
import ProductOrder from '@/models/productorder.ts'
import Order from '@/models/order.ts'
import Product from '@/models/product.ts'

export default {
  name: 'OrdersPage',
  data: () => {
    return {
      data: orders,
      fullMenu,
      ordereredMenu: []
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

    //find products in menu from ordered products
    fullMenu.forEach((product) => {
      order_1['products'].forEach((ordered_product) => {  
        if(ordered_product.productid == product.id) {
          console.log("Name, price and amount in order_1 with time: "+order_1['time']);
          console.log(product.name  + " | €" + product.price + " | " + ordered_product.count);

          this.ordereredMenu.push([
            [order_1['time'], ordered_product.count], 
            new Product(ordered_product.productid, product.name, product.price, product.description, product.category, product.allergies)
          ]);
        } 
      });

      order_2['products'].forEach((ordered_product) => {
        if(ordered_product.productid == product.id) {
          console.log("Name, price and and amount in order_2 with time: "+order_2['time']);
          console.log(product.name  + " | €" + product.price + " | " + ordered_product.count);

          this.ordereredMenu.push([
            [order_2['time'], ordered_product.count], 
            new Product(ordered_product.productid, product.name, product.price, product.description, product.category, product.allergies)
          ]);
        } 
      });
    });

    // get orderered menu
    console.log(this.ordereredMenu);

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