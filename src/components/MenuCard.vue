<template>
  <div class="card text-black bg-light mb-3 menuItem">
    <h3 class="display-6 card-header">{{ name }}</h3>
    <div class="card-body text-black">
      <img v-if="photo == null" class="foodImage"
           src="https://via.placeholder.com/150x150" alt="">
      <img v-else class="foodImage" :src="photo" alt="">
      <p class="foodTxt"> {{ description }} </p>
      <p class="priceTxT">
        <button type="button" class="btn btn-outline-secondary"><i class="fa fa-minus"></i></button>
        <input style="height: 35px; width: 50%;" type="number" class="numberInput" min="0"/>
        <button type="button" class="btn btn-outline-secondary"><i class="fa fa-plus"></i></button>
        <button type="submit" class="btn btn-outline-secondary"> Voeg toe</button>
        <br>
        &euro; {{ price }} Per stuk
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuCard",
  props: {
    name: String,
    photo: String,
    description: String,
    price: Number
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