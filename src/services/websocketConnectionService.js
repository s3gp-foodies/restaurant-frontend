//import SockJS from 'sockjs-client'
//import Stomp from 'webstomp-client'

/*createWebsocketConnection() {
this.socket = new SockJS("http://localhost:8080/sockjs");
this.stompClient = Stomp.over(this.socket);

    this.stompClient.connect({}, frame => {
        this.stompClient.subscribe("/topic/orders", payload => {
            if(payload.body !== null) {
                this.orders.push(payload.body);
            }
        });
    });
},
sendMessageToServer() {
    this.stompClient.send("/app/orders.input", JSON.stringify({ orders: this.orders }), {});
}*/