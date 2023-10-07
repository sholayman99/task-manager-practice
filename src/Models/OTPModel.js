const mongoose = require('mongoose');

const OtpSchema = mongoose.Schema({
    email:{type: String},
    otp:{type: String},
    status:{type: Number , default:0}
},
    {
        timestamps: true,
        versionKey: false
    })

  const   OtpModel = mongoose.model("Otps" , OtpSchema);
  module.exports = OtpModel;