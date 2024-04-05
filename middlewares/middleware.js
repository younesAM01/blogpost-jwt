const jwt = require('jsonwebtoken');
require('dotenv').config();
const auth = (req,res,next) => {
  const token = req.headers.authorization;
  console.log(token);
  if(token){
    jwt.verify(token,process.env.TOKEN,(err,decoded)=>{
      if(err){
        return res.status(401).json({message:'Invalid token'});
      }
      req.user = decoded;
      next();
    });
  }else{
    return res.status(401).json({message:'No token provided'});
  }
};

module.exports = auth;