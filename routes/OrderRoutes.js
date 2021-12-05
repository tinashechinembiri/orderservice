import {Router} from 'express'; 
import {
    createOrder, cancelOrder, getsingleorder,getallorder
 }  from'../controllers/orderController'; 
 //https://softwarebrothers.co/blog/service-objects-in-node-js/
//https://www.codementor.io/@olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd
//https://attacomsian.com/blog/node-http-post-request
//https://github.com/john-smilga/node-express-course/blob/main/03-task-manager/final/routes/tasks.js
//https://github.com/ronfybish/CV-BOOST/tree/main/controller
const router = new Router(); 
router.route('/createorder/').post(createOrder); 
router.route('/:id').delete(cancelOrder).get(getsingleorder); 
router.route('/getallorder/').get(getallorder); 

 export default router; 
