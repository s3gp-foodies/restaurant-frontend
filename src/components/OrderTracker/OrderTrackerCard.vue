<template>
  <td>
  <draggable class="dragClass row align-items-start"
             :list=ListName group="all-dishes"
             item-key=null @start="dragging=true" @end="dragging=false">
      <template #item="{ element }" >
        <div class="col card text-white bg-dark mb-3">
          <OrderTrackerCardContent :order-name=element.name :order-category=element.category :order-amount=element.amount></OrderTrackerCardContent>
        </div>
      </template>
  </draggable>
  </td>
</template>

<script>
import draggable from "vuedraggable";
import OrderTrackerCardContent from "@/components/OrderTracker/OrderTrackerCardContent";

export default {
  name: "OrderTrackerCard",
  components: {
    draggable,
    OrderTrackerCardContent
  },
  props: {
    ListName: {
      type: Array
    }
  },
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