import App from'./src/Server'; 
import terminate from './src/util/terminate'

 //import config from './config';



const port =  process.env.PORT||5000;// checking for enviroment port  https://www.npmjs.com/package/dotenv
 const AWS_ACCESS_KEY_ID =process.env.AWS_ACCESS_KEY_ID;
 const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY


const Servers =  App.listen(port, () => {
    console.log('server ready http://'+port)

}); 

const exitHandler = terminate(Servers,{
    coredump: false,
    timeout: 500}); 

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'))
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'))
process.on('SIGTERM', exitHandler(0, 'SIGTERM'))
process.on('SIGINT', exitHandler(0, 'SIGINT'))

export default Servers; 