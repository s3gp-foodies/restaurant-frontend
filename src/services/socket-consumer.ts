import SocketService from "@/services/socket.service";

export class SocketConsumer {
    protected _socketService: SocketService | undefined;

    SetSocketService(socketService: SocketService) {
        this._socketService = socketService
    }
}