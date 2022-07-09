

SeatsScheme = Schema(
    {
        seatid:  {type:String, required:true}, 
        seatNumber: {type:String, required:true}, 
        seatType:{type:String, required:true}, 
        seatavailable: {type:Boolean, required:true}
    }
)
export default SeatsScheme; 