export const ordersCalculations = {
    multiplyPriceTotalProduct(orders: any) {
        for (let i = 0; i < orders.length; i++) {
            for (let j = 0; j < orders[i]['product'].length; j++) {  
                const orderprice = orders[i]['product'][j].price;
                const orderamount = orders[i]['product'][j].amount;

                orders[i]['product'][j].totalprice = (orderamount * orderprice).toFixed(2);
            }
        }

        return orders;
    },
    addPriceTotalOrder(orders: any) {
        let totalprice = 0;

        for (let i = 0; i < orders.length; i++) {
            for (let j = 0; j < orders[i]['product'].length; j++) {  
            totalprice += parseFloat(orders[i]['product'][j].totalprice); 

            orders[i].totalprice = totalprice.toFixed(2);    
            }
        }

        return orders;
    },
    addPriceTotalOrders(orders: any) {
        let totalprice = 0;

        for (let i = 0; i < orders.length; i++) {
            totalprice += parseFloat(orders[i].totalprice); 
        } 

        orders.totalprice = totalprice.toFixed(2);

        return orders;
    }
}