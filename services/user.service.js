const User = require("../models/user")

const findUserByEmail=async(email)=>{
  return await User.findOne({email})
}

const findUserById=async(id)=>{
  return await User.findById(id)
}
module.exports={findUserByEmail,findUserById}