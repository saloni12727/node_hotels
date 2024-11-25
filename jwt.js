const jwt = require('jsonwebtoken')

 require('dotenv').config();
const jwtMiddlware = (req,res,next)=>{
      

     const authorization = req.headers.authorization
     if(!authorization) return res.status(401).json({error:"token is not found"});
    // extract the jwt token from the req header
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:"unautorized"});

    try{
        // varify the token
        const decoded = jwt.verify(token,process.env.jwt_secret)
        //attach your information to the req obj
        req.user = decoded;  //req.user has all the payload data like username email id
        next();
    }catch(err){
      console.log(err)
      res.status(500).json({error:"invalid token"})
    }
}


// function to genrate jwt token
const genrateToke = (UserData)=>{
   return jwt.sign({UserData},process.env.jwt_secret,{expiresIn:30000})
}

module.exports = {jwtMiddlware,genrateToke}