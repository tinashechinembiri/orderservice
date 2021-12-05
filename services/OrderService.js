import OrderModel from "../Model/Order";  
import {httpStatusCodes} from '../util/httpStatusCodes';  
import errorHandler from "../util/errorHandler";
import resHandler from '../util/resHandler'
import appintmentService from'../services/AppointmentService'

//https://www.cuelogic.com/blog/microservices-with-node-js
 const createOrderService = async (createorderdata) =>{
      
    const {appointment, orderId} = createorderdata; 
    const isOrdervalid = await OrderModel.findOne({'orderId':orderId}); 
    if (isOrdervalid)
    {
        return {code:httpStatusCodes.NOT_FOUND, message:`order id already exist  +${orderId}`}; 
    }
    
    let appointmentresponse = await appintmentService.CreateAppointment(appointment);
  
    let testreposnse = await resHandler(appointmentresponse); 
    if (!(testreposnse.code == 200))
    {  
                                                                                                                                                                             
      return testreposnse; 
    }
    const id = testreposnse.Id; 
    const orderschemer = orderMap(createorderdata,id ); 
 
    
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
                console.log('user doesnt exist'+ order); 
                return resolve({code:httpStatusCodes.NOT_FOUND, errors:{message:`user doesn't exist with this +${orderId}`, location:'id'}}); 
            }
            else{
              return resolve (order); 
            }
        })

    })

}

function orderMap(request, id)
{
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
        Total:0.0

    })
}
//https://www.tjvantoll.com/2015/09/13/fetch-and-errors/


const orderservice = {
    createOrderService, 
    getanOrderService
}



export default orderservice; 