const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()

const userSchema=mongoose.Schema({
  firstName:{
    type:String,
    maxlength:100,
    default:""
  },
  lastName:{
    type:String,
    maxlength:100,
    default:""
  },
  email:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid email")
      }
    }
  },
  password:{
    type:String,
    required:true,
    trim:true
  },
  posts:{
    
  }
})

userSchema.pre("save",async function(next){
  let user=this
  if(user.isModified("password")){
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password,salt)
    user.password = hash
  }
  next()
})

userSchema.methods.genAuthToken=function(){
  let user=this
  const userObj={sub:user._id.toHexString()}
  const token=jwt.sign(userObj,process.env.DB_SECRET,{"expiresIn":"1d"})
  return token
}

userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  const match = await bcrypt.compare(candidatePassword, user.password);
  return match;
};


const User = mongoose.model("User",userSchema)

module.exports=User