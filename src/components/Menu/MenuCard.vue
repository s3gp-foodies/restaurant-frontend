<template>
  <div v-if="showNotOrdered || isInOrder" class="card text-black bg-light mb-3 menuItem">
    <h3 class="display-6 card-header">{{ product.name }}</h3>
    <div class="card-body text-black" style="display: flex">
      <div style="flex-basis: 300px; display: flex; justify-content: center; align-content: center">
        <img v-if="product.photoUrl == null" class="foodImage"
             src="https://via.placeholder.com/150x150" alt="">
        <img v-else class="foodImage" :src="product.photoUrl" alt="">
      </div>
      <div style="display: flex; justify-content: center; align-content: space-around; flex-direction: column; height: 100%; flex-basis: 450px">
        <p class="foodTxt"> {{ product.description }} </p>
        <div>
          <button type="button" class="btn btn-outline-secondary" @click="subtract()"><i
              class="fa fa-minus"></i></button>
          <input style="height: 30px; width:15%" type="number" class="numberInput" v-model="count"
                 @input="onInput(count)"/>
          <button type="button" class="btn btn-outline-secondary" @click="add()"><i class="fa fa-plus"></i>
          </button>
        </div>
        <div class="test">
        <button type="button" class="btn btn-outline-secondary" @click="addToOrder()">Toevoegen</button>
        </div>
        <div>
          <strong v-if="count >14">Cannot be more then 15</strong>
          <strong v-if="count <0 ">Cannot be less then 0</strong>
        </div>
        <p style="font-weight: bold"> &euro; {{ product.price }} Per stuk</p>
      </div>
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
    showNotOrdered: Boolean
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
      this.onInput()
    },
    subtract() {
      this.count--
      this.onInput()
    },
    onInput() {
      if (this.count < 0) {
        this.count = 0
      } else if (this.count >= 15) {
        this.count = 15
      }
      OrderService.UpdateCurrentOrder(this.product, this.count)
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
  height: 300px;
}

.foodImage {
  max-height: 200px;
  max-width: 300px;
  width: auto;

  padding: 10px;
}

.foodTxt {
  margin: 5px;
  padding: 5px;
}
.test {
  width:100%;
  text-align: center;
}
</style>