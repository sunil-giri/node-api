const {createUser, generateAuthToken, signInWithEmailAndPassword}=require("../services/auth.service")


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
      res.cookie("x-token-access",token).status(200).send({user,token})
    }catch(error){
      throw(error)
    }
  },
  async signin(req,res,next){
    try{
      const user=await signInWithEmailAndPassword(req.body.email,req.body.password)
      if(!user){
        throw new Error
      }
      
      res.status(200).send({user})
    }catch(error){
      throw(error)
    }
  }
}

module.exports=authController