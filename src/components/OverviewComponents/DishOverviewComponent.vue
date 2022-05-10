<template>
  <td v-for="item in orders" :key="item.name">
    <p v-for="order in item" :key="order.name">
      {{order.name}}
    </p>
  </td>
  <td v-for="item in orders" :key="item.name">
    <p v-for="order in item" :key="order.name">
      {{order.time}}
    </p>
  </td>
  <td v-for="item in orders" :key="item.name">
    <draggable class="dragClass row align-items-start" v-for="dish in item" :key="dish.name"
               :list="dish['product']" :item-key="dish['name']" group="all-dishes"
               @start="dragging=true" @end="dragging=false">
        <template #item="{ element }">
            <div class="col card text-white bg-dark mb-3">
              <HeaderCardComponent :order-name=element.name :order-category=element.category :order-amount=element.amount></HeaderCardComponent>
            </div>
        </template>
    </draggable>
  </td>
</template>

<script>
import draggable from "vuedraggable";
import orders from "@/temp/orders.json";
import HeaderCardComponent from "@/components/OverviewComponents/HeaderCardComponent";

export default {
  name: "DishOverviewComponent",
  components: {
    draggable,
    HeaderCardComponent,
  },
  data: () => {
    return {
      orders
    }
  }
}
</script>

<style scoped>
.col {
  bottom: 5px;
  left: 5px;
  right: 5px;
  top: 5px;

  margin: 5px 5px 5px 5px;
}

@media only screen and (max-width: 480px) {
  .dragClass {
    margin-right: 0;
  }
}

@media only screen and (min-width: 1000px) {
  .dragClass{
    margin-right: max(-320px, -120px);
  }
}

@media only screen and (max-width: 999px) and (min-width: 481px) {
  .dragClass{
    margin-right: max(-120px, -25px);
  }
}

.dragClass {
  width: fit-content;
}

</style>