const mongoose=require("mongoose")

const commentSchema=mongoose.Schema({
  comment:{
    type:String,
    required:true,
    maxlength:1000
  },
  post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Posts",
    required:true
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
})

const comment=mongoose.model("Comment",commentSchema)

module.exports=comment