const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {

    let token = req.headers.token
    jwt.verify(token , 'SecretKey123456789' , (err , decoded)=>{
        if(err){
            console.log(token);
            res.status(401).json({message:"UnAuthorized"});
        }else{
            console.log(decoded)
           let email = decoded.data ;
           console.log(email);
           req.headers.email = email ;
           next(); 
        }
    })
}