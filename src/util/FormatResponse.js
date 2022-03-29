export const formatResponse =  (orders) => {
    const {appointment, Coredetails}= orders; 
   return{
    orderId:orders.orderId, 
    isDiscount:orders.isDiscount, 
    discountAmount:orders.discountAmount, 
    Subtotal:orders.Subtotal, 
    Fees:orders.Fees, 
    Cinemaname: orders.Cinemaname, 
    appointment:{
        starttime:appointment.starttime, 
        duration:appointment.duration, 
        appointmentDate:appointment.appointmentDate, 
        appointmentId:appointment.appointmentId
    },
    Coredetails:{
        Emailaddress:Coredetails.Emailaddress, 
        customerid:Coredetails.customerid, 
        name: Coredetails.name
    },
    Total: orders.Total
   }
}

export default formatResponse; 