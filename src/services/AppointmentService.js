import resHandler from '../util/ResHandler'; 
import fetch from "cross-fetch";
import AWS from "aws-sdk"
import { json } from 'express/lib/response';
//https://medium.com/geekculture/de-coupled-microservice-applications-with-aws-sns-sqs-and-aws-lambdas-4416e54f705a
//const appintmenturl = 'https://dummy.restapiexample.com/api/v1/create'; 
const appintmenturl =  'http://localhost:8080/api/addappointment';
export const CreateAppointment = async(appointment) => {
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
    }).then( async (response) => 
    {
        console.log(response)
        const jsonresponse = await response.json(); 
      resStatus = response.status; 
      console.log(resStatus, response.status +response.Data+ 'test complete')
      return  {
          code:response.status, 
          message:jsonresponse.message, 
          Id: jsonresponse.Data 

      }; 
  
    })
    .catch((error)=> {
        console.log(error);
        return {
            code: 500,
            message :{message: error}
            } 
    })

    return await resHandler(response) ; 
}

const awsSnstoappointment = (appointment) => {
    const sns = new AWS.SNS({apiVersion: "2010-03-31"})
    var params = {
        Message:appointment.orderId,
        TopicArn:''
    }
    let publishtextpromise = sns.publish (params).promise(); 
    publishtextpromise.then ( (data) => {
        console.log(`messageID ${data.MessageId}`); 
    }).catch ( (err) => {
        console.log(err); 

    })
}

 const AppointmentService = {
    CreateAppointment, awsSnstoappointment
}

export default AppointmentService; 