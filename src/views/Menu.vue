<template>
  <div class="menu">
    <DishItem></DishItem>
  </div>
</template>

<script>
import DishItem from "../components/DishItem";

export default {
  name: "MenuItem",
  components: {
    DishItem,
  },
};
</script>

<style scoped>
body {
  margin: 0;
}

.stickyMenu {
  list-style-type: none;
  margin: 0 0 0 33%;
  padding: 0;
  overflow: hidden;
  background-color: #333;
  position: fixed;
  top: 0;
  width: 30%;
}

.stickyMenuItem {
  float: left;
  border-right: 1px solid #bbb;
}

.stickyMenuItem:last-child {
  border-right: none;
}

.stickyMenuItem .stickyMenuLink {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.stickyMenuItem .stickyMenuLink:hover:not(.active) {
  background-color: #02315a;
}

.active {
  background-color: #0094d8;
  color: #fff;
}
</style>