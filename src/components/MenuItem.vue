<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <!-- Styled Menu Item with Bootstrap -->
    <div v-for="(dishes, catKey) in data['MenuList']" :key="dishes">
      <!--v-on:click="collapsed = !collapsed" v-show="collapsed"-->
      <div v-for="menuItems in data" :key="menuItems" class="divider" v-on:click="hideDive({catKey})">
          <p class="dividerBarTxt">{{catKey}}</p>
      </div>
        <div v-for="(dish, key) in dishes" :key="dish" :class="catKey" class="card text-black bg-light mb-3 menuItem">
          <h3 class="display-6 card-header">{{key}}</h3>
          <div class="card-body text-black">
          <img v-if="dish.imgLink == null" class="foodImage" src="https://www.martijnkardol.nl/wp-content/uploads/2021/07/placeholder-5.png">
          <img v-else class="foodImage" :src="dish.imgLink" alt="">
          <p class="foodTxt"> {{dish.description}} </p>
          <p class="priceTxT">
            <button type="button" class="btn btn-outline-secondary"><i class="fa fa-minus"></i></button>
            <input style="height: 30px;" type="number" class="numberInput" />
            <button type="button" class="btn btn-outline-secondary"><i class="fa fa-plus"></i></button>
            <button  type="submit" class="btn btn-outline-secondary"> Voeg toe </button> <br>
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
      isHidden: false,
      data: MenuData
    }
  },
  methods: {
    hideDive(key) {
      let className = document.getElementsByClassName(key["catKey"]);
      let i;

      for(i = 0; i < className.length; i++)
      {
        if (className[i].style.display === "" || className[i].style.display === "inline-block") {
          className[i].style.display = "none";
        } else {
          className[i].style.display = "inline-block"
        }
      }
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
    width: 200px;
    height: 200px;
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