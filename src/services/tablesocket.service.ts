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

        this.connection.on("UpdateOrder", function (order) {
            console.log(order)
        })
    }

    Test() {
        this.connectionStatus.then(async () => {
            await this.connection.invoke("test")
        })
    }

    Invoke(methodName: string,args:any[]) {
        this.connectionStatus.then(async () =>{
            await this.connection.invoke(methodName, args)
        })
    }
}

export default TableSocketService;