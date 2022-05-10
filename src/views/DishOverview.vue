<template>
  <h2>Ordres that came in</h2>
  <p> Interact with the the element by dragging them across the screen </p>
  <div class="wrapper">
    <p>Types of orders that you can encounter</p>
    <ul>
      <li class="menuIcons"><font-awesome-icon class="fa-lg fa-2x" icon="bowl-food" /> Appetisers</li> <br>
      <li class="menuIcons"><font-awesome-icon class="fa-lg fa-2x" icon="drumstick-bite" /> Main dish</li> <br>
      <li class="menuIcons"><font-awesome-icon class="fa-lg fa-2x" icon="ice-cream" /> Dessert</li> <br>
      <li class="menuIcons"><font-awesome-icon class="fa-lg fa-2x" icon="bottle-droplet" /> Drinks</li>
    </ul>
  </div>
  <table class="table table-bordered table-info">
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
  width: fit-content
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