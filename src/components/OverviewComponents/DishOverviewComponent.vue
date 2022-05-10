<template>
  <td style="width: 100%border-box">
    <draggable class="dragClass" style="box-sizing: border-box"
               :list="products" :item-key="orderName" group="{{groupName}}"
               :empty-insert-threshold="30"
               @start="dragging=true" @end="dragging=false">
      <template #item="{ element }" >
        <div class="col card text-white bg-dark mb-3">
          <HeaderCardComponent :order-name=element.name :order-category=element.category
                               :order-amount=element.amount></HeaderCardComponent>
        </div>
      </template>
    </draggable>
  </td>
</template>

<script>
import draggable from "vuedraggable";
import HeaderCardComponent from "@/components/OverviewComponents/HeaderCardComponent";

export default {
  name: "DishOverviewComponent",
  components: {
    draggable,
    HeaderCardComponent,
  },
  props: {
    products: {
      type: Array
    },
    groupName: String,
    orderName: String
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
  .dragClass {
    margin-right: max(-320px, -120px);
  }
}

@media only screen and (max-width: 999px) and (min-width: 481px) {
  .dragClass {
    margin-right: max(-120px, -25px);
  }
}

.dragClass {
  width: 100%;
  display: flex;
  justify-content: left;
}

</style>