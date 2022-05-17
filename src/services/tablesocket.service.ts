import {HubConnectionBuilder} from "@microsoft/signalr";
import OrderProduct from "@/models/order-product";



class TableSocketService {
    connection = new HubConnectionBuilder()
    .withUrl("https://localhost:7209/hubs/table", {
        accessTokenFactory: () => localStorage.token,
    })
    .build();
    Connect() {


        this.connection.on("Connected", function (message) {
            console.log(message);
        });

        this.connection.start().catch(e => console.log(e));
    }

    test(currentorder: OrderProduct[]){
        // console.log(currentorder)
        this.connection.invoke("SubmitOrder", currentorder).then(()=>{console.log("done")})
    }
}

export default new TableSocketService();