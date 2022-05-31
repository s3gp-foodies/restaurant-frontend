<template>
  <table v-for="category in listedCategories" :key="category">
    <tr>
      <th colspan="6">{{ category.name }}</th>
    </tr>
    <tr v-for="overview_product in overview_products" :key="overview_product.id">
      <CategoryProduct v-if="overview_product.id === category.id" :overview_product="overview_product"></CategoryProduct>
    </tr>
  </table>
</template>

<script>
import CategoryProduct from './CategoryProduct.vue';
import OrderOverviewProduct from "@/models/order-overview-product.ts";
import {store} from "@/store/store";

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
      overview_products: [],
      listedCategories: []
    };
  },
  inject: ['orderService','menuService'],
  created() {
    this.menuService.Load().then(() => {
      this.orderService.LoadOrders().then(() => {
        this.LoadProductList()
      })
      .catch(error => {
        console.log(error);
      })
    })
    .catch(error => {
      console.log(error);
    })
  },
  methods: {
    LoadProductList() {
      this.categories = store.state.categories;
      const orders = this.orderService.GetOrders();

      console.log(orders);

    //push productid's and orderedproducts in seperate array's
    orders.forEach((order) => {
      //console.log(order) 

      order.products.forEach((orderedProduct) => {
        this.productIds.push(orderedProduct.productId);
        this.orderedProducts.push(orderedProduct);
      });
    });

    //console.log(this.orderedProducts);

    //duplicate overview products
    var duplicate_overview_products = [];
    var duplicate_product_ids = this.checkDuplicateProductIds(this.productIds);

    duplicate_product_ids.forEach((duplicateProductId) => {
      var duplicateProductCount = 0;
      let product = store.getters.GetProductById(duplicateProductId);

      console.log(product);

      this.orderedProducts.forEach((orderedProduct) => {
        if(duplicateProductId === orderedProduct.productId) {
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

      if (!this.listedCategories.includes(product.category)) this.listedCategories.push(product.category);
    })

    //unique overview products
    var unique_overview_products = [];
    var unique_product_ids = this.checkUniqueProductIds(duplicate_product_ids);

    unique_product_ids.forEach((uniqueProductId) => {
      let product = store.getters.GetProductById(uniqueProductId);

      this.orderedProducts.forEach((orderedProduct) => {
        if(uniqueProductId == orderedProduct.productId) {
          console.log(product)
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

      if (!this.listedCategories.includes(product.category)) this.listedCategories.push(product.category);
    })

    //combine unique overiew products and duplicate overview products
    this.overview_products = duplicate_overview_products.concat(unique_overview_products);

    //return totalprice
    this.$emit("totalPrice", this.totalPrice);
    },
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
table:not(:last-of-type) {
  margin-bottom: 16px;
}
th {
  padding: 4px 0;
}
tr:first-of-type {
  border: 1px solid black;
}
tr {
  background-color: #bbbbbb8c;
}
</style>