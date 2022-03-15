<template>
  <div class="orders">

    <table v-for="order in data['orders']" :key="order">
      <tr v-for="product in order['product']" :key="product">
        <td>{{ product.name }}</td>
        <td>{{ product.amount }} x {{ product.price }}</td>
        <td>{{ product.totalprice }}</td>
      </tr>
      <tr>
        <th>{{ order.name }}</th>
        <th></th>
        <th>{{ order.totalprice }}</th>
      </tr>
    </table>

    <p>Totaal: {{ data['orders'].totalprice }}</p>

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
    this.multiplyPriceTotalProduct();
    this.addPriceTotalOrder();
    this.addPriceTotalOrders(); 
  },  
  methods: {
    multiplyPriceTotalProduct() {    
      for (let i = 0; i < this.data['orders'].length; i++) {
        for (let j = 0; j < this.data['orders'][i]['product'].length; j++) {  
          var orderprice = this.data['orders'][i]['product'][j].price;
          var orderamount = this.data['orders'][i]['product'][j].amount;

          this.data['orders'][i]['product'][j].totalprice = (orderamount * orderprice).toFixed(2);
        }
      }
    },
    addPriceTotalOrder() {
      var totalprice = 0;

      for (let i = 0; i < this.data['orders'].length; i++) {
        for (let j = 0; j < this.data['orders'][i]['product'].length; j++) {  
          totalprice += parseFloat(this.data['orders'][i]['product'][j].totalprice); 

          this.data['orders'][i].totalprice = totalprice.toFixed(2);    
        }
      }
    },
    addPriceTotalOrders() {
      var totalprice = 0;

      for (let i = 0; i < this.data['orders'].length; i++) {
        totalprice += parseFloat(this.data['orders'][i].totalprice); 
      } 
      
      this.data['orders'].totalprice = totalprice.toFixed(2);
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