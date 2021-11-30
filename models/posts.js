const mongoose=require("mongoose")

const postSchema=mongoose.Schema({
  title:{
    type:String,
    required:true,
    maxlength:250
  },
  details:{
    type:String,
    default:''
  },
  images:[
    {
      type:String,
    }
  ],
  comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Comment"
  }],
  category:{
    type:String,
    required:true
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
})

const posts=mongoose.model("Posts",postSchema)

module.exports=posts