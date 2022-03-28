<template>
  <h2>Ordres that came in</h2>
  <p> Interact with the the element by touching them </p>
  <table class="table table-bordered table-info">
    <thead class="thead-dark">
    <tr>
      <th scope="col">Bestelling</th>
      <th scope="col">Bezig</th>
      <th scope="col">Bijna klaar</th>
      <th scope="col">Klaar voor servering</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="order in data['orders']" :key="order">
      <td class="dropzone" scope="row" @drop="onDrop($event, 1)" @dragover.prevent @dragenter.prevent>
        <div v-for="product in order['product']" :key="product" >
          <div v-if="product.list === 1" class="card bg-dark text-white mb-3" style="max-width: 18rem;" draggable="true" @dragstart="startDrag($event, product)">
            <div class="card-header">{{order["name"]}}</div>
              <div class="card-body">
                <p class="card-text">{{ product.name }} x{{ product.amount }}</p>
              </div>
          </div>
        </div>
      </td>
      <td class="dropzone" @drop="onDrop($event, 2)" @dragover.prevent @dragenter.prevent>
        <div v-for="product in order['product']" :key="product" >
        <div v-if="product.list === 2" class="card bg-dark text-white mb-3" style="max-width: 18rem;" draggable="true" @dragstart="startDrag($event, product)">
          <div class="card-header">{{order["name"]}}</div>
          <div class="card-body">
            <p class="card-text">{{ product.name }} x{{ product.amount }}</p>
          </div>
        </div>
      </div>
      </td>
      <td class="dropzone" @drop="onDrop($event, 3)" @dragover.prevent @dragenter.prevent>
        <div v-for="product in order['product']" :key="product" >
        <div v-if="product.list === 3" class="card bg-dark text-white mb-3" style="max-width: 18rem;" draggable="true" @dragstart="startDrag($event, product)">
          <div class="card-header">{{order["name"]}}</div>
          <div class="card-body">
            <p class="card-text">{{ product.name }} x{{ product.amount }}</p>
          </div>
        </div>
      </div>
      </td>
      <td class="dropzone" @drop="onDrop($event, 4)" @dragover.prevent @dragenter.prevent>
        <div v-for="product in order['product']" :key="product" >
        <div v-if="product.list === 4" class="card bg-dark text-white mb-3" style="max-width: 18rem;" draggable="true" @dragstart="startDrag($event, product)">
          <div class="card-header">{{order["name"]}}</div>
          <div class="card-body">
            <p class="card-text">{{ product.name }} x{{ product.amount }}</p>
          </div>
        </div>
      </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import orders from '../temp/orders.json';

export default {
  name: "DishOverview",
  data: () => {
    return {
      data: orders
    }
  },
  methods: {
    // Guide used for the drag/drop
    // https://learnvue.co/2020/01/how-to-add-drag-and-drop-to-your-vuejs-project/#adding-drag-and-drop-functionality
    // https://github.com/SortableJS/Vue.Draggable
    startDrag (evt, item) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('productId', item.name)
    },
    onDrop (evt, list) {
      const itemID = evt.dataTransfer.getData('productId')
      let i = 0;
      let j = 0;
      let jsonArray = [];


      for(i; i < orders["orders"].length; i++) {
          jsonArray.push(orders["orders"][i]["product"][j])
          const item = jsonArray.find(item => item.name === itemID)
          console.log(item)

          //item.list = list
          j++
      }

      console.log(jsonArray);
      console.log(list);
      /*
      const item = this.items.find(item => item.id === itemID)
      item.list = list
       */
    }
  }
}


</script>

<style scoped>
.table {
  min-height: 10px;
}
</style>