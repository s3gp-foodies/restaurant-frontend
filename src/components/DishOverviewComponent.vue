<template>
  <td>
  <div v-for="item in orders" :key="item.name">
    <draggable v-for="dish in item" :key="dish.name"
               :list="dish['product']" :item-key="dish['name']" @start="dragging=true" @end="dragging=false">
      <template #item="{ element }">
          <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
            <div class="card-header">{{element.name}}</div>
            <div class="card-body">
              <h5 class="card-title">{{ element.amount }} times orderd</h5> 
            </div>
          </div>
      </template>
    </draggable>
  </div>
</td>
</template>

<script>
import draggable from "vuedraggable";
import orders from "@/temp/orders.json";

export default {
  name: "DishOverviewComponent",
  components: {
    draggable,
  },
  data: () => {
    return {
      orders
    }
  }
}
</script>

<style scoped>

</style>