import {HubConnectionBuilder} from "@microsoft/signalr";


class TableSocketService {
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

    Test() {
        this.connectionStatus.then(async () => {
            await this.connection.invoke("test")
        })
    }

    Invoke(func: Function) {
        this.connectionStatus.then(func)
    }
}

export default TableSocketService;