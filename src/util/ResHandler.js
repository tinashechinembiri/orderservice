//import errorHandler from'../util/errorHandler'; 
const resHandler = async (response) => {
    console.log(response); 
   
    if (response.code === 200 )
    {
        return{
                code :response.code,
                message:response.message,
                Id:response.Id
        }; 
    }
    else 

    {
     
        return{
            code :response.code,
            message:{
                message: response
            },}; 
    }
  //  throw new console.error();
}
export default resHandler;