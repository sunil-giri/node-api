const mongoose=require("mongoose")

const categorySchema=mongoose.Schema({
  name:{
    type:String,
    required:true,
    unique:true,
    maxlength:100
  },
  posts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Posts",
    }
  ]
})

const category=mongoose.model("Category",categorySchema)

module.exports=category