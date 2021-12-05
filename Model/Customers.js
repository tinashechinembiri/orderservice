import  mongoose  from 'mongoose';
//const {model} = mongoose; 

const CustomerScheme = mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId, 
        required:true

    },
    Emailaddress:{
        type:String, 
        required:true,
        minlength:5,
        maxlength:40
    },
    customerid:{
        type:String, 
        required: true

    },
    name: {
        type:String,
        required:true,
        minlength:2,
        maxlength:40
    },
    phone:{
        type:Number, 
        required:true, 
        minlength:9,
        maxlength:12
    }}); 
    const customerModel = mongoose.model('customer', CustomerScheme); 
    //exports.customerModel  = customerModel; 
    //exports.CustomerScheme = CustomerScheme; 
    const customermodels = {customerModel,CustomerScheme}  // create an object than grab model and scheme 
    export default customermodels; 