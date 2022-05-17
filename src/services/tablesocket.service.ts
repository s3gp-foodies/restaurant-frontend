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

        //Function to get something from the BE
        connection.on("UpdateOrder", function (order) {
            console.log(order);
        })

        connection.start().catch(e => console.log(e));

        //Function to send something to the BE
        function test(){
            connection.send("test", 1).then(response =>{
                console.log(response)
            })
        }
    }
}

export default new TableSocketService();