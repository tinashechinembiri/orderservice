import logger from "../../util/Logger";
import orderservice from "../OrderService";

export default class OrderServiceClass {

     constructor( ){
         this.Orderservice = orderservice; 
         if(new.target == OrderServiceClass)
         {
            throw new TypeError("Cannot construct Abstract instances directly");
         }

     }
     
     async GetSingleOrder(orderId)
     {
        return orderservice
        .getanOrderService(orderId)
          .then((response) => {
              if(response?.errors)
              {
                  logger.error(`order id doesn't exist ${orderId}`);
               return  {code:response.code, message:response.errors}
               };
               logger.info('user found')
               return {code:200, message:response};   
          })
     }
    async getallorder() {
     
        throw new TypeError("Methods needs to be overwritten");
     }
     

}