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
      <th class="dropzone" scope="row" @drop="onDrop($event, 1)" @dragover.prevent @dragenter.prevent>
          <div v-for="product in order['product']" :key="product"  class="card bg-dark text-white mb-3" style="max-width: 18rem;" draggable="true" @dragstart="startDrag($event, product)">
            <div class="card-header">{{order["name"]}}</div>
            <div class="card-body">
              <h5 class="card-title">Table 1</h5>
              <p class="card-text">{{ product.name }} x{{ product.amount }}</p>
            </div>
          </div>
      </th>
      <td class="dropzone" @drop="onDrop($event, 2)" @dragover.prevent @dragenter.prevent>
      </td>
      <td class="dropzone" @drop="onDrop($event, 3)" @dragover.prevent @dragenter.prevent>
      </td>
      <td class="dropzone" @drop="onDrop($event, 4)" @dragover.prevent @dragenter.prevent>
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
      console.log(itemID);
      console.log(list);
      let i = 0;
      let j = 0;

      for(i; i < orders["orders"].length; i++) {
          console.log(orders["orders"][i]["product"][j])
          console.log()
          //const item = orders["orders"][i]["product"][j].find(item => item.name === itemID)
          //item.list = list
        j++
      }
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