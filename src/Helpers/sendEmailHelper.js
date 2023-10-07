const nodemailer = require('nodemailer');

const sendEmailHelper = async(EmailTo,EmailText,EmailSub)=>{
    const transporter = nodemailer.createTransport({
        host:'mail.teamrabbil.com',
        port: 25,
        secure: false,
        auth: {
            user: "info@teamrabbil.com",
            pass: '~sR4[bhaC[Qs'
        },tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: 'Task Manager MERN <info@teamrabbil.com>',
        to: EmailTo,
        subject: EmailSub,
        text: EmailText
    };
    return  await transporter.sendMail(mailOptions)
};

module.exports = sendEmailHelper;