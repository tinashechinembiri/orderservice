import {Router} from 'express'; 
 import {
     CreateOrder, CancelOrder, GetSingleOrder, GetAllOrder
  }  from'../controllers/OrderController'; 
 //https://softwarebrothers.co/blog/service-objects-in-node-js/
//https://www.codementor.io/@olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd
//https://attacomsian.com/blog/node-http-post-request
//https://github.com/john-smilga/node-express-course/blob/main/03-task-manager/final/routes/tasks.js
//https://github.com/ronfybish/CV-BOOST/tree/main/controller
const router = new Router(); 
 router.route('/createorder/').post(CreateOrder); 
 router.route('/single/:id').delete(CancelOrder).get(GetSingleOrder); 
 router.route('/getallorder/').get(GetAllOrder); 

 export default router; 
