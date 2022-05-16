<template>
  <td>
  <draggable class="dragClass row align-items-start"
             :list=ListName group="all-dishes"
             item-key=null @start="dragging=true" @end="dragging=false">
      <template #item="{ element }" >
        <div class="col card text-white bg-dark mb-3">
          <HeaderCardComponent :order-name=element.name :order-category=element.category :order-amount=element.amount></HeaderCardComponent>
        </div>
      </template>
  </draggable>
  </td>
</template>

<script>
import draggable from "vuedraggable";
import HeaderCardComponent from "@/components/OrderTracker/HeaderCardComponent";

export default {
  name: "DragCardListComponent",
  components: {
    draggable,
    HeaderCardComponent
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