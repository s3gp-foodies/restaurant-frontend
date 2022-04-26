<template>
  <div v-for="(item, index, number) in orders" :key="item.name">
    {{item[number]}} - {{index}} - {{number}}
    <draggable :list="item" :item-key="item[number]['name']" @start="dragging=true" @end="dragging=false">
      <template #item="{ element }">
        <div class="list-group-item">
          {{ element.name }}
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import orders from "@/temp/orders.json";

export default {
  name: "vueDraggbleTest",
  components: {
    draggable,
  },
  data: () => {
    return {
      orders
    }
  },
}

</script>

<style scoped>

</style>

<!--
<template>
    <div v-for="item in orders" :key="item.name">
      {{item}}
      <draggable :list="item.product" :animation="200" @start="drag=true" @end="drag=false">
      </draggable>
      </div>
</template>
-->