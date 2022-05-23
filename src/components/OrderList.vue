<template>
  <table v-for="category in categories" :key="category">
    <tr>{{ category.name }}</tr>
    <tr v-for="overview_product in overview_products" :key="overview_product.id">
      <CategoryProduct v-if="overview_product.id === category.id" :overview_product="overview_product"></CategoryProduct>
    </tr>
  </table>
</template>

<script>
import CategoryProduct from './CategoryProduct.vue';
import OrderService from "@/services/order.service";
import OrderOverviewProduct from "@/models/order-overview-product.ts";
import MenuService from "@/services/menu.service";

export default {
  name: "OrderList",
  emits: ["totalPrice"],
  components: {
    CategoryProduct
  },
  data: () => {
    return {
      listedOrders: [],
      totalPrice: 0,
      productIds: [],
      orderedProducts: [],
      overview_products: []
    };
  },
  created() {
    this.categories = MenuService.GetCategories();

    //push productid's and orderedproducts in seperate array's
    OrderService.GetOrders().orders.forEach((order) => {
      order.products.forEach((orderedProduct) => {
        this.productIds.push(orderedProduct.productId);
        this.orderedProducts.push(orderedProduct);
      });
    });

    //duplicate overview products
    var duplicate_overview_products = [];
    var duplicate_product_ids = this.checkDuplicateProductIds(this.productIds);
    
    duplicate_product_ids.forEach((duplicateProductId) => {
      var duplicateProductCount = 0;
      let product = MenuService.GetProductById(duplicateProductId);
      
      this.orderedProducts.forEach((orderedProduct) => {
        if(duplicateProductId == orderedProduct.productId) {
          duplicateProductCount += orderedProduct.count;

          this.totalPrice += product.price * orderedProduct.count;
        }
      })

      duplicate_overview_products.push(
        new OrderOverviewProduct(
          duplicateProductId,
          product.name,
          product.price,
          duplicateProductCount,
          product.price * duplicateProductCount
        )
      );
    })

    //unique overview products
    var unique_overview_products = [];
    var unique_product_ids = this.checkUniqueProductIds(duplicate_product_ids);

    unique_product_ids.forEach((uniqueProductId) => {
      let product = MenuService.GetProductById(uniqueProductId);

      this.orderedProducts.forEach((orderedProduct) => {
        if(uniqueProductId == orderedProduct.productId) {
          unique_overview_products.push(
            new OrderOverviewProduct(
              uniqueProductId,
              product.name,
              product.price,
              orderedProduct.count,
              product.price * orderedProduct.count 
            )
          );

          this.totalPrice += product.price * orderedProduct.count;
        }   
      })
    })

    //combine unique overiew products and duplicate overview products
    this.overview_products = duplicate_overview_products.concat(unique_overview_products);

    //return totalprice
    this.$emit("totalPrice", this.totalPrice);
  },
  methods: {
    checkDuplicateProductIds(productIds) {
      const set = new Set(productIds);

      const duplicates = productIds.filter(item => {
          if (set.has(item)) {
              set.delete(item);
          } else {
              return item;
          }
      });

      return duplicates;
    },
    checkUniqueProductIds(duplicate_product_ids) {
      return this.productIds.filter((x) => !duplicate_product_ids.includes(x));
    }
  } 
};
</script>

<style scoped>
table {
  padding: 10px;
  width: 100%;
  border-collapse: initial;
}
th {
  padding: 1px 8px;
}
th:first-of-type {
  padding-right: 162px;
  padding-top: 3px;
}
th:last-of-type {
  padding-left: 52px;
}
th:first-of-type {
  float: left;
}
tr {
  background-color: #bbbbbb8c;
}
</style>