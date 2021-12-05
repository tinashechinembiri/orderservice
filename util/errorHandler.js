export default (error, req,res,next) => {
    try{
        const status = error.status || 500; 
        console.log(status); 
        res.status(status).json(
            {
                code :`${status}`,
                message:error.message,
                location:error.location || 'operational'
            }
        )

    }catch(ex)
    {
        console.log(ex.stack.split("\n"))
        next(ex); 
       
    }
}; 