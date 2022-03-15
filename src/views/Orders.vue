<template>
  <div class="orders">

    <table v-for="orders in data['orders']" :key="orders">
      <tr v-for="order in orders['order']" :key="order">
        <td>{{ order.name }}</td>
        <td>{{ order.amount }} x {{ order.price }}</td>
        <td>{{ order.totalprice }}</td>
      </tr>
      <tr>
        <th>{{ orders.name }}</th>
        <th></th>
        <th>?</th>
      </tr>
    </table>

    <p>Totaal: ?</p>

    <span>
      <button>Kassa betalen</button>&nbsp;
      <button>Digitaal betalen</button>
    </span>

  </div>
</template> 

<script>
import orders from '../temp/orders.json'
export default {
  name: 'OrdersPage',
  data: () => {
    return {
      data: orders
    }
  },
  props: {
    orders: Array
  },
  created() {
    this.multiplyPriceTotalOrders();
    this.addPriceTotalOrder();
    this.addPriceTotalOrders(); 
  },  
  methods: {
    multiplyPriceTotalOrders() {    
      for (let i = 0; i < this.data['orders'].length; i++) {
        for (let j = 0; j < this.data['orders'][i]['order'].length; j++) {  
          var orderprice = this.data['orders'][i]['order'][j].price;
          var orderamount = this.data['orders'][i]['order'][j].amount;
          
          this.data['orders'][i]['order'][j].totalprice = (Math.round(orderamount *  orderprice * 100) / 100).toFixed(2);
        }
      }
    },
    addPriceTotalOrder() {
      
    },
    addPriceTotalOrders() {

    }
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
.orders td:first-of-type, .orders th:first-of-type {
  padding-right: 50px;
}
.orders td:last-of-type, .orders th:last-of-type {
  padding-left: 20px;
}
.orders td:first-of-type {
  float: left;
}
.orders tr {
  background-color: rgba(160, 248, 219, 0.514);
}
.orders table {
  padding: 10px;
}
</style>