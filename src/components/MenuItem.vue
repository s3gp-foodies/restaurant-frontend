<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <div v-for="(dividers, number) in filterArray = makeFilterArray(MenuItems)" :key="filterArray[number]['id']" >

    <div class="divider" v-on:click="hideDive({dividers})">
      <p class="dividerBarTxt">{{dividers}}</p>
    </div>

    <template v-for="(menuItems, index) in MenuItems" :key="MenuItems[index]['id']">
    <!-- <div v-for="(menuItems, index) in backendMenu" :key="backendMenu[index]['id']"> -->
      <div v-if="menuItems['category']['name'] === dividers" :class="dividers" class="card text-black bg-light mb-3 menuItem">

        <h3 class="display-6 card-header">{{menuItems["title"]}}</h3>
        <div class="card-body text-black">
          <p class="foodTxt"> {{menuItems["description"]}} </p>
          <p class="priceTxT">
            <button type="button" class="btn btn-outline-secondary"><i class="fa fa-minus"></i></button>
            <input style="height: 35px; width: 50%;" type="number" class="numberInput" />
            <button type="button" class="btn btn-outline-secondary"><i class="fa fa-plus"></i></button>
            <button  type="submit" class="btn btn-outline-secondary"> Voeg toe </button> <br>
            &euro; {{menuItems["price"]}} Per stuk  </p>
        </div>
      </div>
      </template>

    <!-- </div> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MenuItem",
  data: () => {
    return {
      isHidden: false,
      MenuItems: null,
      filterArray: null
    }
  },
  created() {
    // Simple GET request using axios
    axios.get("https://localhost:7209/api/MenuItem")
        .then(response => this.MenuItems = response.data);
    },
  methods: {
    hideDive(key) {
      let className = document.getElementsByClassName(key["catKey"] || key["dividers"]);
      let i;

      for(i = 0; i < className.length; i++)
      {
        if (className[i].style.display === "" || className[i].style.display === "inline-block") {
          className[i].style.display = "none";
        } else {
          className[i].style.display = "inline-block"
        }
      }
    },
    makeFilterArray(inputArray) {
      let filterArray = [];
      let number = 0;

      for (number; number < inputArray?.length; number++) {
        filterArray.push({'key':  inputArray[number]["category"]["id"], "value": inputArray[number]["category"]["name"]});
      }

      filterArray.sort((a, b) => a.key - b.key)

      function removeDuplicates(array) {
        let uniqueArray = [];
        array.forEach(element => {
          if(!uniqueArray.includes(element["value"])) {
            uniqueArray.push(element["value"])
          }
        });
        return uniqueArray;
      }

      filterArray = removeDuplicates(filterArray);
      return filterArray
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