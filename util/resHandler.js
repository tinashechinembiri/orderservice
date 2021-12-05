import errorHandler from'../util/errorHandler'; 
const resHandler = async (res) => {
    const response = await res.json(); 
    console.log(response)
    if (res.status === 200 )
    {
        return{
                code :res.status,
                message:response.message,
                Id:response.Data
        }; 
    }
    else 
    {
     
        return{
            code :res.status,
            message:{
                url:res.url,
                message: response
            },
           
    }; 
    }
  //  throw new console.error();
}
export default resHandler;