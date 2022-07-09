//import { number, boolean, string } from 'joi'
import  mongoose  from 'mongoose';
import customermodels from './Customers'; 
//https://stackabuse.com/mongoose-with-nodejs-object-data-modeling/
const OrderScheme = mongoose.Schema(

    {
        orderId         : {type:String, required:true},
        isDiscount      : {type:Boolean, required:true},
        discountAmount  : {type:Number,required: function(){return this.isDiscount} }, 
        Subtotal        : {type:Number, required:true}, 
        Fees            : {type:Number, required:false},      
        Cinemaname      : {type:String, required:true},
        tags            :[{type:Object, required:true

        }],
        appointment:{
            type :new mongoose.Schema({
               starttime: {
                   type:String, 
                   required:true,},
                   duration:{
                       type:Number, 
                       required: true
                   }, 
                   _id:{
                    type: mongoose.Schema.Types.ObjectId, 
                    required:true
            
                },
                   appointmentDate:{
                       type:Date, 
                       required:true
                   }, 
                   appointmentId:{
                       type:String, 
                       required:true
                   } 
                   })}, 
        Coredetails:{type:customermodels.CustomerScheme, required:true},
        Orderstatus  :{type:String, required:true},
        Total        :{type:Number, required:true}

    }
); 
const OrderModel = mongoose.model('orders', OrderScheme); 

export default OrderModel; 