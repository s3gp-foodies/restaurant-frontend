<template>
  <div class="order">
    <h2>Order Page</h2>
  </div>
  <p>Menu-item</p>
  <input v-model="this.items.amount" class="form-control" type="number" placeholder=0 @input="OnInput">
  <button type="button" class="btn btn-success" @click="add">+</button>
  <button type="button" class="btn btn-danger" @click="del">-</button>
  <div v-if="this.items.amount >14">Cannot be more then 15</div>

    <div v-for="(items) in items" :key="items">
        {{items}}
    </div>
</template> 

<script>
export default {
  name: 'OrderPage',
  
  methods: {
      add : function () {
          this.items.amount ++
          this.OnInput()
      },
      del : function (){
          this.items.amount --
          this.OnInput()
        console.log(this.$data.items)
      },
      OnInput: function(){
        if(this.items.amount  <0){
          this.items.amount = 0
        }else if (this.items.amount >= 15){
          this.items.amount = 15
        }
        sessionStorage.setItem("amount", this.items.amount);
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
    console.log(haha)
    console.log(this.haha)
}
}
</script>

<style scoped>
</style>