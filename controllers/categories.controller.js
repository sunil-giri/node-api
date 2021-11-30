const httpStatus = require("http-status")
const { categoryService } = require("../services/category.service")


const categoryController={
  async createCategory(req,res,next){
    try{
      const category=await categoryService.createCategory(req.body.name)
      res.status(httpStatus.CREATED).send({category})
    }catch(error){
      next(error)
    }
  },
  async createPost(req,res,next){
    try{
      const post= await categoryService.createPost(req.body.title,req.body.category,req.user._id)
      res.status(httpStatus.CREATED).send({post})
    }catch(error){
      next(error)
    }
  },
  async createComment(req,res,next){
    try{
      const comment=await categoryService.createComment(req.body.comment,req.body.postid,req.user._id)
      res.status(httpStatus.CREATED).send({comment})
    }catch(error){
      next(error)
    }
  }
}

module.exports={
  categoryController
}