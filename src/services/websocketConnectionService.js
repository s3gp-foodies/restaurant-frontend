import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'

export const websocketConnection = {
    openWebsocketConnection() {
        this.socket = new SockJS("http://localhost:7209/hubs/table");
        this.stompClient = Stomp.over(this.socket);
    },
    createWebsocketConnection(items, name) {
        this.stompClient.connect({}, () => {
            this.stompClient.subscribe("/topic/"+name, payload => {
                if(payload.body !== null) {
                    items.push(payload.body);
                }
            });
        });
    },
    sendMessageToServer(items, name) {
        this.stompClient.send("/app/"+name+".input", JSON.stringify({ data: items }), {});
    }
}