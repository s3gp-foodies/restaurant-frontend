import {HubConnectionBuilder} from "@microsoft/signalr";
import orderService from "@/services/order.service";

class SocketService {
    connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7209/hubs/table", {
            accessTokenFactory: () => localStorage.token,
        })
        .build();
    private connectionStatus: any;

    Connect() {
        this.connection.on("Connected", function (message) {
            console.log(message);
        });

        this.connectionStatus = this.connection.start().catch(e => console.log(e));
    }

    Disconnect() {
        this.connectionStatus = this.connection.stop().catch(e => console.log(e));
    }

    Test() {
        this.connectionStatus.then(async () => {
            await this.connection.invoke("test")
        })
    }

    Invoke(methodName: string, args: any[] | undefined = undefined): Promise<any> {
        if(!this.connectionStatus) this.Connect()
        return this.connectionStatus.then(async () => {
            if (args) await this.connection.invoke(methodName, args)
            else await this.connection.invoke(methodName)
        })
    }
}

export default SocketService;