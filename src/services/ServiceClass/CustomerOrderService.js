import orderserviceclass from "../ServiceClass/OrderServiceClass"
import orderservice from "../OrderService";
export default class  CustomerOrderService extends  orderserviceclass{
    
    constructor()
    {
        super()
    }
    async getallorder() {
        const order = await orderservice.getallorder();  
        return order; 

    }



    
}