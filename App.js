import server from'./Server'; 
const port =  process.env.PORT||5000;// checking for enviroment port  https://www.npmjs.com/package/dotenv

server.listen(port, () => {
    console.log('server ready http://'+port)

})
export default server; 