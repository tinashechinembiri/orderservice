import fetch from 'node-fetch'; 
import resHandler from '../util/resHandler'; 
//const appintmenturl = 'https://dummy.restapiexample.com/api/v1/create'; 
const appintmenturl =  'http://localhost:8080/api/addappointment';
const CreateAppointment = async(appointment) => {
    let resStatus =0; 
   const response = await fetch (appintmenturl, {
        method:'post', 
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
            "Accept-Charset": "utf-8"
        }, 
        body: JSON.stringify(appointment)
        //{"name":"test","salary":"123","age":"23"}
    }).then( (response) => 
    {
        
      resStatus = response.status; 
      return  response; 
  
    })
    .catch((error)=> {
        console.log(error);
        return error; 
    })

    return await resHandler(response) ; 
}

const appintmentService = {
    CreateAppointment
}

export default appintmentService; 