 import {errorHandler}  from"../util/errorHandler"; 
 import {httpStatusCodes} from '../util/httpStatusCodes';  
import orderservice from '../services/OrderService'; 
 import logger from'../util/Logger'; 
 import middlewareasync from "../middleware/async"
 import customerserviceclass from "../services/ServiceClass/CustomerOrderService";



 export const CreateOrder = middlewareasync( async(req, res, next) =>{
      const requestData = req.body; 
     const {orderId,appointment} = req?.body;
          if(!orderId || !appointment || !requestData)
      {
          logger.error(`code:${httpStatusCodes.BAD_REQUEST}, message:The payload is missing some data`)
         return errorHandler(
              {
                  status:httpStatusCodes.BAD_REQUEST,
                  message:'The payload is missing some data',
            location:'payload'}, 
                 req,
              res,
              next); 
      }

      const response = await orderservice.createOrderService(requestData)   
     console.log(response.code+ JSON.stringify(response));
     res.status(response.code).json(response); 
 }); 


 export const CancelOrder = async (req, res, next) => {
     console.log("works");
 }
 export const GetSingleOrder = middlewareasync( async (req,res, next) => {
  const{  id:orderid} = req.params; 
 const orders = new customerserviceclass(); 
  const order = await orders.GetSingleOrder(orderid)
  const response = order.message; 
  res.status(order.code).json(response)


 })
 export const GetAllOrder = middlewareasync( async (req, res, next) => {
     //const order =  await orderservice.getallorder(); 
    const orders = new customerserviceclass(orderservice)
     const order = await orders.getallorder()
     res.status(200).json(order)
 }); 



