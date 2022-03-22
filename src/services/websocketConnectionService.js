import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'

export const websocketConnection = {
    openWebsocketConnection() {
        this.socket = new SockJS("http://localhost:7209/hubs/table");
        this.stompClient = Stomp.over(this.socket);
    }
}