<template>
  <h2>Ordres that came in</h2>
  <p> Interact with the the element by dragging them across the screen </p>
  <table class="table table-bordered table-info">
    <thead class="thead-dark">
    <tr>
      <th scope="col">New</th>
      <th scope="col">Accepted</th>
      <th scope="col">In Progress</th>
      <th scope="col">Done</th>
      <th scope="col">Being served</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td style="width: 18rem">
      <dish-overview-component class="list-group-item">

      </dish-overview-component>
      </td>
      <td style="width: 18rem">
        <draggable :list="acceptedList" group="all-dishes" item-key=null @start="dragging=true" @end="dragging=false">
        <template #item="{ element }">
          <div class="card text-black bg-warning mb-3">
            <div class="card-header">{{element.name}}</div>
            <div class="card-body">
              <h5 class="card-title">{{ element.amount }}x ordered </h5>
            </div>
          </div>
        </template>
      </draggable>
      </td>
      <td style="width: 18rem">
        <draggable :list="inProgressList" group="all-dishes" item-key=null @start="dragging=true" @end="dragging=false">
            <template #item="{ element }">
              <div class="card text-white bg-danger mb-3">
                <div class="card-header">{{element.name}}</div>
                <div class="card-body">
                  <h5 class="card-title">{{ element.amount }}x ordered </h5>
                </div>
              </div>
            </template>
        </draggable>
      </td>
      <td style="width: 18rem; height: 100%">
        <draggable  :list="doneList" group="all-dishes" item-key=null @start="dragging=true" @end="dragging=false">
        <template #item="{ element }">
          <div class="card text-white bg-success mb-3">
            <div class="card-header">{{element.name}}</div>
            <div class="card-body">
              <h5 class="card-title">{{ element.amount }}x ordered </h5>
            </div>
          </div>
        </template>
      </draggable>
      </td>
      <td style="width: 18rem">
        <draggable :list="servingList" group="all-dishes" item-key=null @start="dragging=true" @end="dragging=false">
        <template #item="{ element }">
          <div class="card text-black bg-info mb-3 remove">
            <div class="card-header">{{element.name}}</div>
            <div class="card-body">
              <h5 class="card-title">{{ element.amount }}x ordered </h5>
            </div>
          </div>
        </template>
      </draggable>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import dishOverviewComponent from "@/components/DishOverviewComponent";
import draggable from "vuedraggable";
let acceptedList = [];
let inProgressList = [];
let doneList = [];
let servingList = [];


window.setInterval(() => {
  emptyServingList()
}, 60000)

function emptyServingList() {
  let removeArray = []
  let counter = 0

  removeArray = document.getElementsByClassName("remove");
  for(counter; counter < removeArray.length; counter++) {
    removeArray[counter].style.display = "none"
  }
  servingList.splice(0, servingList.length)
}

export default {
  name: "DishOverview",
  components: {
    dishOverviewComponent,
    draggable
  },
  data: () => {
    return {
      acceptedList,
      inProgressList,
      doneList,
      servingList,
    }
  },
}


</script>

<style scoped>
.table {
  min-height: 10px;
}

draggable {
  position: fixed!important;
}
</style>