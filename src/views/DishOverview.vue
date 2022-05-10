<template>
  <h2>Orders that came in</h2>
  <p> Interact with the the element by dragging them across the screen </p>
  <div class="wrapper">
    <div style="display: flex; justify-content: center">
      <div class="menuIcons card text-white bg-dark"><font-awesome-icon class="fa-lg fa-2x" icon="bowl-food" /> Appetisers</div> <br>
      <div class="menuIcons card text-white bg-dark"><font-awesome-icon class="fa-lg fa-2x" icon="drumstick-bite" /> Main dish</div> <br>
      <div class="menuIcons card text-white bg-dark"><font-awesome-icon class="fa-lg fa-2x" icon="ice-cream" /> Dessert</div> <br>
      <div class="menuIcons card text-white bg-dark"><font-awesome-icon class="fa-lg fa-2x" icon="bottle-droplet" /> Drinks</div>
    </div>
    <i>Types of orders that you can encounter</i>
  </div>
  <table style="margin-top: 10px;" class="table table-bordered table-info">
    <thead class="thead-dark">
    <tr>
      <th>Table</th>
      <th aria-sort="descending">Time</th>
      <th>New</th>
      <th>In Progress</th>
      <th>Done</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <dish-overview-component class="list-group-item" style="width: fit-content">

      </dish-overview-component>
      <drag-card-list-component  :ListName="inProgressList">
      </drag-card-list-component>
      <drag-card-list-component  :ListName="doneList">
      </drag-card-list-component>
    </tr>
    </tbody>
  </table>
</template>

<script>
import dishOverviewComponent from "@/components/OverviewComponents/DishOverviewComponent";
import dragCardListComponent from "@/components/OverviewComponents/DragCardListComponent";

let inProgressList = [];
let doneList = [];

/*
Table herbouwen
ToDO list hierboven
 */

export default {
  name: "DishOverview",
  data: () => {
    return {
      inProgressList,
      doneList,
    }
  },
  components: {
    dishOverviewComponent,
    dragCardListComponent
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

.menuIcons {
  min-width: 100px;
  max-width: 200px;
  margin: 5px
}

.wrapper {
  text-align: center;
}
.wrapper ul {
  display: inline-block;
  margin: 0;
  padding: 0;
  /* For IE, the outcast */
  zoom:1;
  *display: inline;
}
.wrapper li {
  float: left;
  padding: 2px 5px;
}
</style>