const mongoose = require('mongoose');

const DataModel = mongoose.Schema({
    email:{type: String , unique:true},
    name:{type: String},
    mobile:{type:String},
    password:{type: String}
},
{timestamps:true , versionKey:false});

const UserModel = mongoose.model("users" , DataModel);
module.exports = UserModel;