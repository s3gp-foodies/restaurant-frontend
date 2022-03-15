<template>
  <div class="orders">

    <table v-for="orders in data['orders']" :key="orders">
      <tr v-for="order in orders['order']" :key="order">
        <td>{{ order.name }}</td>
        <td>{{ order.amount }} x {{ order.price }}</td>
        <td>28.50</td>
      </tr>
      <tr>
        <th>{{ orders.name }}</th>
        <th></th>
        <th>47.00</th>
      </tr>
    </table>

    <p>Totaal: 84.00</p>

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
  async created() {
    await this.getAllOrders()
  },  
  methods: {
    async getAllOrders() {
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