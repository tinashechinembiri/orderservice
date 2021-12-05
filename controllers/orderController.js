import errorHandler  from"../util/errorHandler"; 
import {httpStatusCodes} from '../util/httpStatusCodes';  
import orderservice from '../services/OrderService'; 
import { response } from "express";
import middlewareasync from "../middleware/async"
export const createOrder = middlewareasync(  async(req, res, next) =>{
    // appointment got to supplied on appointment service 
    //console.log(req.body); 
    const requestData = req.body; 
    const {orderId,appointment,  } = req.body;
     
    if(!orderId || !appointment || !requestData)
    {
        return errorHandler(
            {
                status:httpStatusCodes.BAD_REQUEST,
                message:'The payload is missing some data',
                location:'payload'
            }, 
            req,
            res,
            next); 
    }
    const response = await orderservice.createOrderService(requestData)   
    res.status(response.code).json(response.message); 
}); 


export const cancelOrder = async (req, res, next) => 
{
    console.log("works");
}
export const getsingleorder = (req,res, next) => 
{
    /* id got be string
        got to load order data and use appintment id to collect the appointment 
        go

    */
 const{  id:orderid} = req.params; 

  return orderservice
  .getanOrderService(orderid)
    .then((response) => {
        if(response?.errors)
        {
          
            return errorHandler(
                {
                    status:response.code,
                    message:response.errors.message,
                    location:response.errors.location
                }, 
                req,
                res,
                next);
        };
        res.status(200).json(response);    
    })
    .catch((ex)=>{
        console.log(ex.stack.split("\n"))
        next(ex); 
    })
}
export const getallorder = (req, res, next) => 
{
    
    console.log("works")
}



