//https://www.youtube.com/watch?v=rltfdjcXjmk&t=858s
//const http = require('http'); 
import morgan from'morgan'; 
import express  from 'express';
//const dbconfig = require(`../orderservice/config/env/${process.env.ENV_VARIABLE}/secrets.json`)
import  config  from 'config';
import router  from './routes/OrderRoutes'; 
import errorHandler  from"./util/errorHandler"; 
import { Console } from'console';
import connectdb from'./Database/Connection'; 
const app = express(); 

//https://www.youtube.com/watch?v=be9sHQ7xqo0
const port =  process.env.PORT||5000;// checking for enviroment port  https://www.npmjs.com/package/dotenv
app.use(express.json()); 
app.use(express.urlencoded({extended:true}))
if (app.get('env')==='development'){
app.use(morgan('tiny')); 
}

const moongosedb = connectdb.getInstance(); 
moongosedb.connect(); 
//console.log(config.get('secrets.amazondbconnection'))
app.get('/healthcheck/', (req,res)=>
{
    res.send({'message':'success'})
})

app.use('/api/order', router);

app.use(errorHandler); 


///https://livecodestream.dev/post/beginners-guide-to-redis-and-caching-with-nodejs/  adding redis 

export default app; 