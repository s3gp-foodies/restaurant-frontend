<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <div v-if="this.bool == false">Testing</div>
  <div v-for="(dishes, item) in MenuItems" :key="dishes">
    <div  class="divider">
      <p class="dividerBarTxt"> {{ item }} </p>
    </div>
    <div v-for="(dish, key) in dishes" :key="dish" >
      <div v-if="dish.amount != 0" class="card text-black bg-light mb-3 menuItem">
        <h3 class="display-6 card-header">{{ key }}</h3>
        <div class="card-body text-black">
          <img class="foodImage" :src="dish.imgLink" alt="">
          <p class="foodTxt"> {{ dish.description }} </p>
          <p class="priceTxT">
            <button type="button" class="btn btn-outline-secondary" @click="subtractfrom(dish)"><i
                class="fa fa-minus"></i></button>
            <input style="height: 30px;" type="number" class="numberInput" v-model="dish.amount"
                   @input="OnInput(dish.amount, dish)"/>
            <strong v-if="dish.amount >14">Cannot be more then 15</strong>
            <strong v-if="dish.amount <0 ">Cannot be less then 0</strong>
            <button type="button" class="btn btn-outline-secondary" @click="addto(dish)"><i class="fa fa-plus"></i>
            </button>
            <!--      <button  type="submit" class="btn btn-outline-secondary"> Voeg toe </button> <br>-->
            &euro; {{ dish.price }} Per stuk
          </p>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
export default {
  name: 'OrderPage',

  methods: {
    addto: function (dish) {
      dish.amount++
      this.OnInput(dish.amount, dish)
    },
    subtractfrom: function (dish) {
      dish.amount--
      this.OnInput(dish.amount, dish)
    },
    OnInput: function (amount, dish) {
      if (dish.amount < 0) {
        dish.amount = 0
      } else if (dish.amount >= 15) {
        dish.amount = 15
      }
      sessionStorage.setItem("Test",  JSON.stringify(this.MenuItems))
    },
    filtermethod: function (dish) {
      console.log(dish)
    }
  },
  data() {
    return {
      MenuItems: {},
      bool: false
    }
  },
  mounted() {
    let MenuItems = JSON.parse(sessionStorage.getItem("Test"))
    this.MenuItems = MenuItems
    console.log(MenuItems)
    if (!MenuItems.length) {
      this.bool = true
    }

    // for(let items in MenuItems){
    //   console.log(items)
    //   for(let dishes in items["Salade"]){
    //     console.log(dishes)
    //   }
    // }
  },
  computed: {}
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
  border: black 1px solid;
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

.hide {
  color: red;
  /*display: none;*/
}
</style>