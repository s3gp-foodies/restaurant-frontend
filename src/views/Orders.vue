<template>
  <div class="orders">

    <table>
      <tr>
        <td>gerecht1</td>
        <td>3 x 9.50</td>
        <td>28.50</td>
      </tr>
      <tr>
        <td>gerecht2</td>
        <td>2 x 5.50</td>
        <td>11.00</td>
      </tr>
      <tr>
        <td>gerecht3</td>
        <td>1 x 7.50</td>
        <td>15.00</td>
      </tr>
      <tr>
        <th>bestelling1</th>
        <th></th>
        <th>47.00</th>
      </tr>
    </table>

    <table>
      <tr>
        <td>gerecht1</td>
        <td>3 x 9.50</td>
        <td>28.50</td>
      </tr>
      <tr>
        <td>gerecht2</td>
        <td>2 x 5.50</td>
        <td>11.00</td>
      </tr>
      <tr>
        <td>gerecht3</td>
        <td>1 x 7.50</td>
        <td>15.00</td>
      </tr>
      <tr>
        <th>bestelling2</th>
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
export default {
  name: 'OrdersPage',
  data: () => {
    return {
      allOrders: []
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
      
    },
    createHardcodedOrder() {
      //name: String
      //products: Array
      //totalprice: Decimal
    },
    createHardcodedProduct() {
      //name: String
      //amount: Int
      //price: Decimal
      //totalprice: Decimal
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