<template>
  <h4>Totaal: &euro;&thinsp;{{ parseFloat(totalPrice).toFixed(2) }}</h4>
</template>

<script>
import OrderService from "@/services/order.service";
import MenuService from "@/services/menu.service";

export default {
  name: "OrderPrice",
  data: () => {
    return {
      totalPrice: 0,
    };
  },
  created() {
    OrderService.GetOrders().orders.forEach((order) => {
      let totalPriceOrder = 0;

      order.products.forEach((orderedProduct) => {
        let product = MenuService.GetProductById(orderedProduct.productId);

        totalPriceOrder += product.price * orderedProduct.count;
      });

      this.totalPrice += totalPriceOrder;
    });
  }
}
</script>