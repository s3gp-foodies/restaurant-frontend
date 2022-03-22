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
    <tr>
      <th scope="row" @drop="onDrop($event, 1)" @dragover.prevent @dragenter.prevent>
          <div class="card bg-dark text-white mb-3" style="max-width: 18rem;" draggable="true" @dragstart="startDrag($event, this)">
            <div class="card-header">Order 1</div>
            <div class="card-body">
              <h5 class="card-title">Table 1</h5>
              <p class="card-text">Burger Menu x2, 1x Pizza hawai</p>
            </div>
          </div>
        <div class="card bg-dark text-white mb-3" style="max-width: 18rem;" draggable="true">
          <div class="card-header">Order 2</div>
          <div class="card-body">
            <h5 class="card-title">Table 1</h5>
            <p class="card-text">Pasta menu, Kruiden boter basket</p>
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
export default {
  name: "DishOverview",
  methods: {
    startDrag (evt, item) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.id)
      console.log(item)
    },
    onDrop (evt, list) {
      console.log(evt, list)
      /*
      const itemID = evt.dataTransfer.getData('itemID')
      console.log(itemID) // Undefined
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