const User = require("../models/user")
const { findUserByEmail } = require("./user.service")


const createUser= async(email,password)=>{
  try{
    const user= new User({email,password})
    await user.save()
    return user
  }catch(error){
    throw error
  }
}

const generateAuthToken=(user)=>{
  const token=user.genAuthToken()
  return token
}

const signInWithEmailAndPassword=async (email,password)=>{
  try{
  const user=await findUserByEmail(email)
  if(!user){
    throw new Error("Wrong email")
  }
  if(!(await user.comparePassword(password) )){
    throw new Error("Wrong password")
  }
  return user
  }catch(error){
    throw(error)
  }
}

module.exports={createUser,generateAuthToken, signInWithEmailAndPassword}