import {HubConnectionBuilder} from "@microsoft/signalr";

class TableSocketService {
    Connect() {
        const connection = new HubConnectionBuilder()
            .withUrl("https://localhost:7209/hubs/table", {
                accessTokenFactory: () => localStorage.token,
            })
            .build();

        connection.on("Connected", function (message) {
            console.log(message);
        });

        connection.start().catch(e => console.log(e));
    }
}

export default new TableSocketService();