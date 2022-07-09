import jwt, { verify } from 'jsonwebtoken'; 

export default verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token)
    {
        return res.status(400).send('Token is required')

    }
    try{
        const decoded = jwt.verify(token, 'add a config for the enviroment '); 
        req.user = decoded; 

    }catch(ex)
    {
        return res.status(401).send('invalid token'); 
    }
    return next(); 
}