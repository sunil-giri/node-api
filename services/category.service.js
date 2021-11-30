const httpStatus = require("http-status")
const { ApiError } = require("../middlewares/apiError")
const Category = require("../models/category")
const Post = require("../models/posts")
const Comment=require("../models/comment")
const User = require("../models/user")


const categoryService={
  async createCategory(name){
    try{
      const category= new Category({name})
      if(!category){
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,"Category cannot be created!")
      }
      await category.save()
      return category
    }catch(error){
      throw(error)
    }
  },
  async createPost(title,ctgy,userid){
    try{
      const category=await Category.findOne({name:ctgy})
      const user=await User.findById(userid)
      if(!user){
        throw new ApiError(httpStatus.FORBIDDEN,"User does not exists!")
      }
      if(!category){
        throw new ApiError(httpStatus.FORBIDDEN,"Category does not exists!")
      }
      const post= new Post({title,category:ctgy,user:userid})
      await  post.save()
      category.posts=[...category.posts,post]
      await category.save()
      user.posts=[...user.posts,post]
      await user.save()
      return post
    }catch(error){
      throw(error)
    }
  },
  async createComment(com,postid,userid){
    try{
      const post=await Post.findById(postid)
      if(!post){
        throw new ApiError(httpStatus.NOT_FOUND,"Post does not exists!")
      }
      const comment=new Comment({comment:com,post:postid,user:userid})
      comment.post=postid
      post.comments=[...post.comments,comment]
      await post.save()
      await comment.save()
      return comment
    }catch(error){
      throw error
    }
  }
}

module.exports={
  categoryService
}