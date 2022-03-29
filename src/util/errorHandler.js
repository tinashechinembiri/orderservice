import logger from'../util/Logger'; 
export const errorHandler = (error, req,res,next) => {
   
    try{
        const status = error.status || 500; 
        console.log('here1')
        res.status(status).json(
            {
                code :`${status}`,
                message:error.message,
                location:error.location || 'operational'
            }
        )

    }catch(ex)
    {
        console.log('here2'); 
        logger.error(ex.stack.split("\n"))
        next(ex); 
       
    }
}; 
const errorMethods = {
    errorHandler
}

export default errorMethods; 