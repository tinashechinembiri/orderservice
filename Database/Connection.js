import  mongoose  from "mongoose";
//https://github.com/akashyap2013/CRUD_Application_Node/blob/master/server/database/connection.js
//https://blog.logrocket.com/design-patterns-in-node-js/
let instance = null; 
//https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html
export default class dbclass {

    constructor(props){
        this.properties = props; 
        this._conn = null; 
    }

    connect = async()=>{
        try{
        this._conn = await mongoose.connect('mongodb+srv://tchine1:password01@cluster0.vjyux.mongodb.net/Test_appointment?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true }); 
        console.log(`mongodb connected :${this.conn.connection.host}`)
        }catch(err){
            console.log(err);
            return err;  
        }

    }

    get conn(){
        return this._conn; 
    }

    static getInstance (){
        if (!instance)
        {
            instance = new dbclass(); 
        }
        return instance; 
    }
}