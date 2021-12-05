import  mongoose  from 'mongoose';

const AppointmentScheme =  mongoose.Schema(
    {
        cinemastoreid:{type:String, required:true}, 
        appointmentId:{type:String, required:true}, 
        movieId:{type:String, required:true},
        quantity:{type:Number, required: true},
        duration:{type:Number, required: true},
        starttime:{type:String, required:true},
        orderref:{type:String, required:true}, 
        customerid:{type:String, required:true}, 
        appointmentDate :{type:String, required:true}, 
        address :{type:Array, required:false},
        cinemaAddress:{type:Object, required:true}, 
        seats:{type:Array, required:true}
    }

); 
const appointmentModel = mongoose.model('appointment', AppointmentScheme); 
const appintmentSchemes ={AppointmentScheme, appointmentModel}
export default appintmentSchemes; 