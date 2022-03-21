<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <!-- Styled Menu Item with Bootstrap -->
  <div v-for="(dishes, key) in data['MenuList']" :key="dishes" >
    <div v-for="menuItems in data" :key="menuItems"  class="divider">
      <p class="dividerBarTxt"> {{key}} </p>
    </div>
    <div v-for="(dish, key) in dishes" :key="dish" class="card text-black bg-light mb-3 menuItem">
    <h3 class="display-6 card-header">{{key}}</h3>
    <div class="card-body text-black">
    <img class="foodImage" :src="dish.imgLink" alt="">
    <p class="foodTxt"> {{dish.description}} </p>
    <p class="priceTxT">
      <button type="button" class="btn btn-outline-secondary" @click="subtractfrom(dish)"><i class="fa fa-minus"></i></button>
      <input style="height: 30px;" type="number" class="numberInput" v-model="dish.amount" @input="OnInput(dish.amount, dish)" />
      <strong v-if="dish.amount >14">Cannot be more then 15</strong>
      <strong v-if="dish.amount <0 ">Cannot be less then 0</strong>
      <button type="button" class="btn btn-outline-secondary" @click="addto(dish)"><i class="fa fa-plus"></i></button>
<!--      <button  type="submit" class="btn btn-outline-secondary"> Voeg toe </button> <br>-->
      &euro; {{dish.price}} Per stuk  </p>
    </div>
    </div>
  </div>
</template>

<script>
import MenuData from "../temp/JSONMenu.json"

export default {
  name: "MenuItem",
  data: () => {
    return {
      data: MenuData
    }
  },
  methods: {
    addto: function (dish){
      dish.amount++
      this.OnInput(dish.amount, dish)
    },
    subtractfrom: function (dish){
      dish.amount--
      this.OnInput(dish.amount, dish)
    },
    OnInput: function (amount, dish){
      if(dish.amount  <0){
        dish.amount = 0
      }else if (dish.amount >= 15){
        dish.amount = 15
      }
      sessionStorage.setItem("Test",  JSON.stringify(this.data.MenuList))
    }
  }
}
</script>

<style scoped>

  .dividerBarTxt {
    margin: 5px;
  }

  .divider {
    padding: 10px;
    color: #f2f2f2;
    margin: auto;
    width: 65%;
    border: #01192d 1px solid;
    background-color: #02315a;
  }

  .menuItem {
    display: inline-block;
    border:  black 1px solid;
    margin: 10px 10px 10px 30px;
    padding: 10px;
    width: 33%;
  }

  .foodImage {
    width: 180px;
    float: left;
  }

  .foodTxt {
    margin: 5px;
    padding: 5px;
  }

  .priceTxT {
    font-weight: bold;
  }
</style>