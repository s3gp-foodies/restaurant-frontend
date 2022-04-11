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
      <dish-overview-component class="list-group-item">

      </dish-overview-component>
    </tr>
    </tbody>
  </table>
</template>

<script>
import dishOverviewComponent from "@/components/DishOverviewComponent";


export default {
  name: "DishOverview",
  components: {
    dishOverviewComponent
  }
}


</script>

<style scoped>
.table {
  min-height: 10px;
}
</style>