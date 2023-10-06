const UserModel = require("../Models/UsersModel");
const jwt = require("jsonwebtoken")


exports.registration = async(req,res) =>{

try {
    const reqBody = req.body;
    const result = await UserModel.create(reqBody);
    res.status(201).json({message:"sucesss" , data:result});
} catch (error) {
    res.status(400).json({message:"Failed" , data:error.toStringify()});
}

};

exports.login= async(req,res) =>{
    try {
     const reqBody = req.body;
     const result = await UserModel.find({}).count()
     if(result === 1){
        let payload = {exp: Math.floor(Date.now() / 1000) + (24*60*60) , data:reqBody.email};
        let token = jwt.sign(payload,'SecretKey123456789')
        res.status(200).json({message:"sucesss" , data:token});
     }else{
        res.status(400).json({message:"Failed" , data:"No User Found"});
     }
     
    } catch (error) {
        res.status(400).json({message:"Failed" , data:error.toStringify()});  
    }
};


exports.userProfileDetails = async (req,res) =>{
   try {
    const result = await UserModel.find({});
    res.status(200).json({message:"sucesss" , data:result});
   } catch (error) {
    res.status(400).json({message:"Failed" , data:error.toStringify()});
   }

}

