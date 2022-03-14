<template>
  <div class="order">
    <h2>Order Page</h2>
  </div>
  <p>Menu-item</p>
  <input v-model="testing" class="form-control" type="number" placeholder={testing} @input="OnInput">
  <button type="button" class="btn btn-success" @click="add">+</button>
  <button type="button" class="btn btn-danger" @click="del">-</button>
  <div v-if="this.testing >9">Cannot be more then 10</div>
</template> 

<script>
export default {
  name: 'OrderPage',
  
  methods: {
      add : function () {
          this.testing ++,
          this.OnInput()
      },
      del : function (){
          this.testing --,
          this.OnInput()
      },
      OnInput: function(){
        if(this.testing  <0){
          this.testing = 0
        }else if (this.testing >= 10){
          this.testing = 10
        }
      }
  },
  data() {
    return {
      testing:0
    }
  }
}
</script>

<style scoped>
</style>