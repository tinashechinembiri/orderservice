import chai from 'chai';
import rewire from 'rewire';
import sinon from 'sinon'
import chaiAsPromised from 'chai-as-promised';
import  mongoose  from 'mongoose';
import sinonChai from 'sinon-chai';
import appintmentService from '../services/AppointmentService';
import orderservice from '../services/OrderService';
import OrderModel from '../Model/Order';
import {jest} from '@jest/globals'
import * as resHandler from '../util/ResHandler';
           

const sandbox = sinon.createSandbox(); 
const expect = chai.expect; 
chai.use(chaiAsPromised)
chai.use(sinonChai);


describe('orderservice - Create', () => {
let findOrderstub, createOrderstub, appointmentStub, findallStub,sampleOrder ; 
beforeEach(()=>{
     sampleOrder = {
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
    }; 
    findOrderstub = sandbox.stub(mongoose.Model, 'findOne').resolves(null); 

    appointmentStub = sandbox.stub(appintmentService, 'CreateAppointment').returns(Promise.
        resolve(
            {code:200, 
        message:'Appointment created',
        Id:12345})); 

})
afterEach(() => {
    sandbox.restore()
})
describe('create order - negative return ', () => {
    const orderResponse = {
        code:400, 
        message:{url:'test',message:{message:'Appointment already exist'}}
    }; 
    beforeEach (() => {
        sandbox.restore(); 

    }); 
    afterEach (() => {

        sandbox.restore(); 
    })
    it('order exist should return a failed response', async()=>{
        sandbox.stub(mongoose.Model, 'findOne').resolves(sampleOrder)
        let order =  await orderservice.createOrderService(sampleOrder)
        expect(order).to.be.an('object'); 
        expect(order.message).to.have.property('errors')
        expect(order.message.errors).to.contain(sampleOrder.orderId); 
    })
    it ('order appointmentservice has not responsed with 200 ', async() =>{
        
        sandbox.stub(mongoose.Model, 'findOne').resolves(null); 
        sandbox.stub (appintmentService, 'CreateAppointment').returned (
            Promise.resolve(orderResponse)
        ); 
        sandbox.stub(resHandler, 'default').returns(
            Promise.resolve(orderResponse)
        ); 
        let order =  await orderservice.createOrderService(sampleOrder); 
        expect(order.code).to.be.equal(400); 
        expect(order).to.be.an('object');
    }); 


}); 

describe('order create  valid response ', ()=>{
    let saveorderStub; 
    const orderresponse = {
        code:200, 
        message:'Appointment already exist', 
        Id:'6241fe7edd1f8b2bacbef64e'
    }
    beforeEach(()=>{
        sandbox.restore(); 
       // let orderMod = new OrderModel(sampleOrder); 
        saveorderStub = sandbox.stub(OrderModel.prototype, 'save').resolves(sampleOrder)

    })
    afterEach(()=>{
        sandbox.restore(); 
    })
    it('order appointment should return with the valid response', async()=>{
        sandbox.stub(mongoose.Model, 'findOne').resolves(null); 
        sandbox.stub(appintmentService, 'CreateAppointment').returns (
            Promise.resolve(orderresponse)
        ); 
        sandbox.stub(resHandler, 'default').returns (
            Promise.resolve(orderresponse)
        ); 
        const order = await  orderservice.createOrderService(sampleOrder); 
        expect(order.code).deep.equal(200); 
        expect(order).to.be.an('object'); 
        expect(order.message).to.have.property('orderId')
      
    })

});

describe('order get service', ()=>{
    it('order not found ', async() =>{
        let order = await orderservice.getanOrderService(sampleOrder.orderId); 
        
        expect(order.code).eq(404); // deep equal 
        expect(order).to.have.property('errors')
        expect(order.errors.message).to.contain(sampleOrder.orderId); 
    })

    it('order get should return valid values and 200 code ', async()=>{
        sandbox.restore();   
        sandbox.stub(mongoose.Model, 'findOne').resolves(sampleOrder); 

        let order = await orderservice.getanOrderService(sampleOrder.orderId); 
        expect(order).is.not.null; 
        expect(order.orderId).eq(sampleOrder.orderId); 
    })
})

}); 