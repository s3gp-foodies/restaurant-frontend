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
      <th scope="col">Beaning served</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <dish-overview-component class="list-group-item">

      </dish-overview-component>
      <td>
        <draggable :list="acceptedList" group="all-dishes" item-key=null @start="dragging=true" @end="dragging=false">
        <template #item="{ element }">
          <div class="card text-black bg-warning mb-3" style="max-width: 18rem;">
            <div class="card-header">{{element.name}}</div>
            <div class="card-body">
              <h5 class="card-title">{{ element.amount }}x ordered </h5>
            </div>
          </div>
        </template>
      </draggable>
      </td>
      <td>
        <draggable :list="inProgressList" group="all-dishes" item-key=null @start="dragging=true" @end="dragging=false">
            <template #item="{ element }">
              <div class="card text-white bg-danger mb-3" style="max-width: 18rem;">
                <div class="card-header">{{element.name}}</div>
                <div class="card-body">
                  <h5 class="card-title">{{ element.amount }}x ordered </h5>
                </div>
              </div>
            </template>
        </draggable>
      </td>
      <td>
        <draggable :list="doneList" group="all-dishes" item-key=null @start="dragging=true" @end="dragging=false">
        <template #item="{ element }">
          <div class="card text-black bg-info mb-3" style="max-width: 18rem;">
            <div class="card-header">{{element.name}}</div>
            <div class="card-body">
              <h5 class="card-title">{{ element.amount }}x ordered </h5>
            </div>
          </div>
        </template>
      </draggable>
      </td>
      <td>
        <draggable :list="servingList" group="all-dishes" item-key=null @start="dragging=true" @end="dragging=false">
        <template #item="{ element }">
          <div class="card text-white bg-success mb-3" style="max-width: 18rem;">
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
  }
}


</script>

<style scoped>
.table {
  min-height: 10px;
}
</style>