const {createUser, generateAuthToken, signInWithEmailAndPassword}=require("../services/auth.service")
const { registerEmail } = require("../services/email.service")


const authController= {
  async testing(req,res,next){
    try{
      res.send("Hello")
    }catch(error){

    }
  },
  async register(req,res,next){
    try{
      const user=await createUser(req.body.email,req.body.password)
      const token=await generateAuthToken(user)
      await registerEmail(req.body.email,user)
      res.cookie("x-token-access",token).status(200).send({user,token})
    }catch(error){
      next(error)
    }
  },
  async signin(req,res,next){
    try{
      const user=await signInWithEmailAndPassword(req.body.email,req.body.password)
      const token = await generateAuthToken(user);
      res.cookie("x-access-token",token).status(200).send({user,token})
    }catch(error){
      next(error)
    }
  },
  async isauth(req,res,next){
    try{
      res.json({working:"yes"})
    }catch(error){
      next(error)
    }
  }
}

module.exports=authController