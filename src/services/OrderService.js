import OrderModel from "../Model/Order";  
import {httpStatusCodes} from '../util/httpStatusCodes';  
import formatResponse from '../util/FormatResponse'; 
import {CreateAppointment} from'../services/AppointmentService'; 
import logger from'../util/Logger'; 

//https://www.cuelogic.com/blog/microservices-with-node-js

 const createOrderService = async (createorderdata) =>{
      
    const {appointment, orderId} = createorderdata; 
    const isOrdervalid = await OrderModel.findOne({'orderId':orderId}); 
    if (isOrdervalid)
    {
        logger.error('order id already exist'+ orderId); 
        return {code:httpStatusCodes.BAD_REQUEST, message:{'errors':`order id already exist+${orderId}`}}; 
    }
    
    let appointmentresponse = await CreateAppointment(appointment);
  
    
    if (!(appointmentresponse.code === 200))
    {   
        logger.error('appoint service failed'+ orderId);                                                                                                                                                                     
      return appointmentresponse; 
    }
    console.log(appointmentresponse)

    const orderschemer = orderMap(createorderdata, appointmentresponse.Id); 
    
    const result = await orderschemer.save(); 

    const { Coredetails:{name} } = result; 
  
    return {code:200, message:{orderId,name}};        
}

const getanOrderService = async(orderId) => {
  
    return new Promise((resolve)=> 
    {
        OrderModel.findOne({'orderId':orderId})
        .then((order) => {
            if (!order)
            {
                logger.error('order  doesnt exist'+ orderId); 
                return resolve({code:httpStatusCodes.NOT_FOUND, errors:{message:`user doesn't exist with this +${orderId}`, location:'id'}}); 
            }
            else{
                 const formattedResponse = formatResponse(order);  
                 return resolve(formattedResponse); 
            }
        })

    })

}
const getallorder = async () => {
  const result = await OrderModel.find ({}, function(er, result )
    {
        if (er)
        {
            logger.error('user doesnt exist'+ er.message); 
            return er; 
        }
        else{
        
            return result; 
        }
    }).clone(); 
    
    const response = result.map((data)=>{
        return formatResponse(data);}) 
        return response; 
}
function orderMap(request, id){
   const{orderId, appointment, Coredetails, Subtotal, Fees, Cinemaname, discountAmount,isDiscount} = request; 
        return  new  OrderModel({
       orderId : orderId, 
       Subtotal:Subtotal, 
       Fees: Fees,
       isDiscount:isDiscount,
       discountAmount:discountAmount, 
       Cinemaname:Cinemaname, 
       appointment:{
        _id:id,
        starttime:appointment.starttime,
        duration:appointment.duration,
        appointmentDate:appointment.appointmentDate,
        appointmentId:appointment.appointmentId,},
        tags:request.tags, 
        Coredetails:{
            _id:Coredetails._id,
            Emailaddress:Coredetails.Emailaddress,
            customerid: Coredetails.customerid,
            name:Coredetails.name, 
            phone:parseInt(Coredetails.phone)    
        }, 
        Orderstatus:"pending", 
        Total:Subtotal

    }); 
}
//https://www.tjvantoll.com/2015/09/13/fetch-and-errors/


const orderservice = {
    createOrderService, 
    getanOrderService, 
    getallorder
}



export default orderservice; 