const jwt = require('jsonwebtoken');
require('dotenv').config();

async function GenSecret(req,res,next){
  // console.log(req.headers);
  // console.log("entered Middleware");
   const authToken = req.headers.authorization;
   if(!authToken || authToken==="" || authToken===undefined){
    res.status(404).json({
        msg: "Not Authorized, Please signin",
    });
   }
  //  console.log(authToken);
  const authData = authToken.split(" ");
  const token = authData[1];
   const verified = await jwt.verify(token, process.env.JWT_SECRET);
  if(!verified){
    res.status(404).json({
        msg : "Not Authorized",
    })
  }
  req.username = verified.username;

  await next();
}


module.exports = {
    GenSecret,
}