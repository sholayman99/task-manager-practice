const UserModel = require("../Models/UsersModel");
const OtpModel = require("../Models/OTPModel");
const sendEmailHelper = require("../Helpers/sendEmailHelper")
const jwt = require("jsonwebtoken");

//creating an user account
exports.registration = async(req,res) =>{

try {
    const reqBody = req.body;
    const result = await UserModel.create(reqBody);
    res.status(201).json({message:"sucesss" , data:result});
} catch (error) {
    res.status(400).json({message:"Failed" , data:error.toStringify()});
}

};

//Letting a user log in.

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


//finding user infromation
exports.userProfileDetails = async (req,res) =>{
   try {
    const result = await UserModel.find({});
    res.status(200).json({message:"sucesss" , data:result});
   } catch (error) {
    res.status(400).json({message:"Failed" , data:error.toStringify()});
   }

};


//updating user profile

exports.updateUserProfile = async(req,res) =>{
    try {
        const email = req.headers["email"] ;
        const reqBody = req.body;
        const result = await UserModel.updateOne({email:email},reqBody);
        res.status(200).json({message:"sucesss" , data:result});

    } catch (error) {
        res.status(400).json({message:"Failed" , data:error.toStringify()});  
    }
};

//verifing an user with his email.

exports.RecoverVerifyEmail = async(req,res) =>{

    const email = req.params.email;
    const OTPcode = Math.round(100000 + Math.random() * 900000);
    let EmailText = "Your OTP code is " + OTPcode;
    let EmailSubject = "Task Manager Verification"
    try {
        const result = await UserModel.findOne({email: email}).count();
        console.log(result)
        if(result === 1){
        
        const createOTP = await OtpModel.create({email:email,otp:OTPcode});
        await sendEmailHelper(email,EmailSubject,EmailText) ;
        res.status(200).json({message:"sucesss", data:"Your OTP code has been set to Your Email"});

        }
    } catch (error) {
        res.status(401).json({message:"Failed" , data:"Invalid Email"});
    }

}

