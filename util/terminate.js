import logger from'../util/Logger'; 
function terminate (server, options={coredump:false, timeout:500}){
    const exit = code => {
        options.coredump?process.abort() : process.exit(code) 
    }
    return (code, reason) => (err, Promise)=>{
        if (err && err instanceof Error) {
            logger.error(err.message, err.stack)
        }
        server.close(exit); 
        setTimeout(exit, options.timeout).unref();   
    }
}
export default terminate; 