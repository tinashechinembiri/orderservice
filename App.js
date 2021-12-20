
import app from'./Server'; 
import terminate from './util/terminate'
const port =  process.env.PORT||5000;// checking for enviroment port  https://www.npmjs.com/package/dotenv

const server =  app.listen(port, () => {
    console.log('server ready http://'+port)

}); 

const exitHandler = terminate(server,{
    coredump: false,
    timeout: 500}); 

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'))
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'))
process.on('SIGTERM', exitHandler(0, 'SIGTERM'))
process.on('SIGINT', exitHandler(0, 'SIGINT'))

export default server; 