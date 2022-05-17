<template>
  <div></div>
</template>

<script>
import SocketService from "@/services/socket.service";

let socketService = new SocketService()

export default {
  name: "SocketContainer",
  inject: ['accountService', 'menuService', 'orderService'],
  created() {
    this.accountService.SetSocketService(socketService)
    this.menuService.SetSocketService(socketService)
    this.orderService.SetSocketService(socketService)
  }
}
</script>

<style scoped>

</style>