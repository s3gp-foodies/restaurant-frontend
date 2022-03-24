<template>
<!--  <div class="order">-->
<!--    <h2>Order Page</h2>-->
<!--  </div>-->
<!--  <p>Menu-item</p>-->
<!--  <input v-model="this.items.amount" class="form-control" type="number" placeholder=0 @input="OnInput">-->
<!--  <button type="button" class="btn btn-success" @click="add">+</button>-->
<!--  <button type="button" class="btn btn-danger" @click="del">-</button>-->
<!--  <div v-if="this.items.amount >14">Cannot be more then 15</div>-->

<!--    <div v-for="(items) in items" :key="items">-->
<!--        {{items}}-->
<!--    </div>-->

<!--  <div v-for="(amount,items) in haha" :key="items">-->
<!--    {{items}}-->
<!--  </div>-->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <div v-for="(dishes, item) in haha" :key="dishes" >
    <div v-for="menuItems in haha" :key="menuItems"  class="divider">
      <p class="dividerBarTxt"> {{item}} </p>
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
export default {
  name: 'OrderPage',
  
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
      }
  },
  data() {
    return {
      items: {
        item1: {
          name: "test",
          amount: 0
        }
      },
      haha : {

      }
    }
  },
  mounted (){
    let haha = JSON.parse(sessionStorage.getItem("Test"))
    this.haha  = haha
    console.log(haha.dishes)
    console.log(haha)
},
  computed : {
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