<template>
  <p>test</p> 
  <table v-for="order in listedOrders" :key="order">
    <!--<OrderProduct :order="order"></OrderProduct> uit orderproduct component halen (loop) -->
    <tr>
      <th>{{ order.time }}</th>
      <th></th>
      <th>&euro;&thinsp;{{ parseFloat(order.totalprice).toFixed(2) }}</th>
    </tr>
  </table>
</template>

<script>
//import OrderProduct from "@/components/OrderProduct";
import MenuService from "@/services/menu.service";
import OrderService from "@/services/order.service";
//import OrderOverviewProduct from "@/models/order-overview-product.ts";
//import OrderOverview from "@/models/order-overview.ts";

export default {
  name: "OrderList",
  components: {
    //OrderProduct
  },
  data: () => {
    return { 
      listedOrders: [],
      totalPrice: Number,
      isLoading: true,
    }
  },
  created() {
    MenuService.Load().then(() => {
      OrderService.LoadOrders().then(() => {
        this.loadData();
        this.isLoading = false;
      })
    })
  
  },
  async loadData() {
      console.log(OrderService.GetOrders());

      /*this.totalPrice = 0;

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
      });*/
    }
}
</script>