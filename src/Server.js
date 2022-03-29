//https://www.youtube.com/watch?v=rltfdjcXjmk&t=858s
//const http = require('http'); 
import express  from 'express';
//const dbconfig = require(`../orderservice/config/env/${process.env.ENV_VARIABLE}/secrets.json`)
 import router  from './routes/OrderRoutes'; 
 import AWS from "aws-sdk"
 import {errorHandler}  from"./util/errorHandler"; 
 import env from'dotenv'; 
 env.config(); 
 import connectdb from'./Database/Connection'; 
 const app = express(); 
// //https://www.youtube.com/watch?v=be9sHQ7xqo0
 app.use(express.json()); 
 app.use(express.urlencoded({extended:true}))
// if (app.get('env')==='development'){
// //app.use(morgan('tiny')); 
// }
const AWS_ACCESS_KEY_ID =process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
const moongosedb = connectdb.getInstance(); 
moongosedb.connect(); 
 AWS.config.update ({
     region:'eu-west-1',
     accessKeyId:AWS_ACCESS_KEY_ID, 
     secretAccessKey:AWS_SECRET_ACCESS_KEY
 }); 
app.get('/healthcheck/', (req,res)=>
 {
     res.send({'message':'success'})
     })
 app.use('/api/order', router);
 app.use(errorHandler); 

///https://livecodestream.dev/post/beginners-guide-to-redis-and-caching-with-nodejs/  adding redis 
export default app; 
