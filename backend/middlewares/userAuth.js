const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const verifyUser = (req,res,next)=>
{
     const webToken = req.headers.auth;
     if(!webToken)
     return res.status(400).json({"error" : "Couldn't find the token"});
     const decoded = jwt.verify(webToken, JWT_SECRET);
     req.id = decoded.id;
     next();
}

module.exports = verifyUser;