const nodemailer=require("nodemailer")
const Mailgen = require("mailgen")
require("dotenv").config()

let transporter= nodemailer.createTransport({
  service:"Gmail",
  secure:true,
  auth:{
    user:process.env.EMAIL,
    pass:process.env.EMAIL_PASSWORD
  }
})

const registerEmail= async(userEmail,user)=>{
  try{
    const emailToken=user.generateRegisterToken()
    let mailGenerator=new Mailgen({
      theme:"default",
      product:{
        name:"Api Test",
        link:"localhost:3001/api/auth"
      }
    })
    const email={
      body:{
        name:userEmail,
        intro:"Welcome",
        action:{
          instructions:"To validate your account,please click here:",
          button:{
            color:"#1a73e5",
            text:"Validate your account",
            link:`${process.env.SITE}?verification=${emailToken}`
          }
        },
        outro:"Need help or have questions? Just reply to this email,we\'d love to help."
      }
    }
    let emailBody=mailGenerator.generate(email)
    let message={
      from:process.env.EMAIL,
      to:userEmail,
      subject:"Welcome!!",
      html:emailBody
    }

    await transporter.sendMail(message)
  }catch(error){
    throw(error)
  }
}

module.exports={registerEmail}