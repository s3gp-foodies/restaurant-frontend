<template>
  <div v-for="item in orders" :key="item.name">
    <draggable class="dragClass" v-for="dish in item" :key="dish.name"
               :list="dish['product']" :item-key="dish['name']" group="all-dishes"
               @start="dragging=true" @end="dragging=false">
      <template #item="{ element }">
          <div class="card text-white bg-dark mb-3">
            <div class="card-header">{{element.name}} X{{element.amount}}</div>
          </div>
      </template>
    </draggable>
  </div>
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
  @media only screen and (max-width: 480px) {
    .dragClass {
      margin-right: 0px;
    }
  }

  @media only screen and (min-width: 1000px) {
    .dragClass{
      margin-right: max(-220px, -120px);
    }
  }

  @media only screen and (max-width: 999px) and (min-width: 481px) {
    .dragClass{
      margin-right: max(-220px, -20px);
    }
  }

  .dragClass {
    width: fit-content;
  }
</style>