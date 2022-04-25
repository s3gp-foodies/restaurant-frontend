<template>
  <h2>Ordres that came in</h2>
  <p> Interact with the the element by dragging them across the screen </p>
  <table class="table table-bordered table-info">
    <thead class="thead-dark">
    <tr>
      <th scope="col">Table</th>
      <th scope="col">Time</th>
      <th scope="col">New</th>
      <th scope="col">In Progress</th>
      <th scope="col">Done</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>
        <p>Tafel 1</p>
      </td>
      <td>
        <p>17:53</p>
      </td>
      <td>
      <dish-overview-component class="list-group-item">

      </dish-overview-component>
      </td>
      <td >
        <draggable :list="inProgressList" group="all-dishes" item-key=null @start="dragging=true" @end="dragging=false" >
            <template #item="{ element }" >
                <div class="card text-white bg-danger mb-3">
                  <div class="card-header">{{element.name}} X{{element.amount}}</div>
                </div>
            </template>
        </draggable>
      </td>
      <td>
        <draggable :list="doneList" group="all-dishes" item-key=null @start="dragging=true" @end="dragging=false">
        <template #item="{ element }">
            <div class="card text-white bg-success mb-3">
              <div class="card-header">{{element.name}} X{{element.amount}}</div>
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

/*
Kijken naar wanneer order helemaal in done staat om dan te verwerken naar servering
Coloumen weg halen: Accepted --> Bening serverd
De andere 2 TD verwerken naar Componenten en dan kijken of het in een component kan of niet

Kleuren blind kijken welke kleuren werken met de cards
Table herbouwen
ToDO list hierboven

 */
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