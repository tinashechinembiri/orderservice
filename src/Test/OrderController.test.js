import {CreateOrder} from'../controllers/orderController';
import {jest, expect} from '@jest/globals'
import  errorMethods  from '../util/errorHandler'
import orderservice from '../services/OrderService';

//https://stackoverflow.com/questions/35756479/does-jest-support-es6-import-export
// /https://stackoverflow.com/questions/59508494/unit-test-in-nodejs-using-jest
//https://stackoverflow.com/questions/70474763/typeerror-cannot-assign-to-read-only-property-now-of-object-performance
// jest.mock('../util/errorHandler', (error, req, res, next) => {
//     return jest.mockImplementation ((error, req, res, next) => {
//         res.status(400)
//     })
// })
describe( 'createorder ', () => {
    let ordermock = {
        orderId : '123', 
        Subtotal:20, 
        Fees: 0,
        isDiscount:false,
        discountAmount:0, 
        Cinemaname:'name', 
        appointment:{
         _id:'12345',
         starttime:'12:00',
         duration:2,
         appointmentDate:"2021-12-09T12:17:21",
         appointmentId:'test123',},
         tags:['test1','test2'], 
         Coredetails:{
             _id:'73661',
             Emailaddress:'test123@mail.com',
             customerid:'cus123',
             name:'test name', 
             phone:parseInt('0987654321')    
         }, 
         Orderstatus:"pending", 
         Total:20 
    }
    let res = {}
 beforeEach(() => {
      res = {
             json : jest.fn(), 
            status : jest.fn()
     }
    
 })
 afterEach(()=>{
     console.log('after ')
 })
  const mockResponse = () => {
     const res = {};
     res.status = jest.fn()
     res.json = jest.fn()
     return res;
   }
   const mockRequest =() => {

   }
/*   it('request body is empty should return with 400', async() => {
    // jest.spyOn(errorMethods, 'errorHandler').mockImplementation ((
    //  error= {
    //         status:400,
    //         message:'The payload is missing some data',
    //         location:'payload'}, 
    //         req, 
    //         mockResponse, 
    //         next 
    // ) => {
    //     res = mockRequest(); 
    //     res.status(error.status)
    //     res.json(error.message)
    // }); 
      // sandbox.stub ( errorMethods, 'errorHandler')
    const req = { body : { orderId : '', appointment:{}}}; 
    const res = mockResponse(); 
    let next  = jest.fn();   
  await CreateOrder(req, res, next);
  console.log(res)
  //expect(errorMethods.errorHandler).toBeCalled(); 
   
    
      
  }) */
   it('should return a valid response and 200 response code', async() => {
        jest.spyOn(orderservice, 'createOrderService').mockResolvedValue ({code:200, message:{orderId:'test123',name:'test name'}}); 
        const req = { body : { ...ordermock}}; 
       // const res = mockResponse(); 
        let next  = jest.fn();   
        await CreateOrder(req, res, next);
        console.log(res.status); 
   })
//   it ('order id exist it should return 404 that user is not found ')
//   it ('appointment service has faced an error different responsecode')
})