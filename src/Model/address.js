
const addressScheme = mongoose.Schema(
    {
        streetName:{type:String, required:true}, 
        town: {type:String, required:true}, 
        postcode: {type:String, required:true}, 
        country:{type:String, required:true}, 
        mobileNo:{type:String, required:true},
        phoneNo:{type:String, required:true},
    }
); 
//module.exports = mongoose.model('address', addressScheme); 

export default addressScheme; 