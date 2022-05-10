<template>
  <div v-if="showNotOrdered || isInOrder" class="card text-black bg-light mb-3 menuItem">
    <h3 class="display-6 card-header">{{ product.name }}</h3>
    <div class="card-body text-black">
      <img v-if="product.photoUrl == null" class="foodImage"
           src="https://via.placeholder.com/150x150" alt="">
      <img v-else class="foodImage" :src="product.photoUrl" alt="">
      <p class="foodTxt"> {{ product.description }} </p>
      <p class="priceTxT">
        <button type="button" class="btn btn-outline-secondary" @click="subtract()"><i
            class="fa fa-minus"></i></button>
        <input style="height: 30px;" type="number" class="numberInput" v-model="count"
               @input="OnInput(count)"/>
        <strong v-if="count >14">Cannot be more then 15</strong>
        <strong v-if="count <0 ">Cannot be less then 0</strong>
        <button type="button" class="btn btn-outline-secondary" @click="add()"><i class="fa fa-plus"></i>
        </button>
        <button type="button" class="btn btn-outline-secondary" @click="addToOrder()">Toevoegen</button>
        <button v-if="delButton == true" type="button" class="btn btn-outline-danger" @click="del()"><i class="fa fa-trash" aria-hidden="true"></i></button>
        &euro; {{ product.price }} Per stuk
      </p>
    </div>
  </div>
</template>

<script>

import Product from "@/models/product";
import OrderService from "@/services/order.service";

export default {
  name: "MenuCard",
  props: {
    product: Product,
    showNotOrdered: Boolean,
    orderPage: Boolean,
    delButton: Boolean
  },
  data: () => {
    return {
      isInOrder: Boolean,
      count: Number
    }
  },
  created() {
    this.count = OrderService.GetCurrentOrderCount(this.product);
    this.isInOrder = this.count > 0;
  },
  methods: {
    add() {
      this.count++
      this.OnInput()
    },
    subtract() {
      this.count--
      this.OnInput()
    },
    OnInput() {
      if (this.count < 0) {
        this.count = 0
      } else if (this.count >= 15) {
        this.count = 15
      }
      OrderService.UpdateCurrentOrder(this.product, this.count)
    },
    del(){
      console.log("ha")
      OrderService.DeleteFromCurrentOrder(this.product)
    },
    addToOrder(){
      OrderService.Save()
    }
  }
}
</script>

<style scoped>
.menuItem {
  display: inline-block;
  border: black 1px solid;
  margin: 10px 10px 10px 30px;
  width: 33%;
}

.foodImage {
  width: 150px;
  height: 150px;
  float: left;
  padding: 10px;
}

.foodTxt {
  margin: 5px;
  padding: 5px;
}

.priceTxT {
  font-weight: bold;
}
</style>