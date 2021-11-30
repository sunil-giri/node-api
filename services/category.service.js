const httpStatus = require("http-status")
const { ApiError } = require("../middlewares/apiError")
const Category = require("../models/category")
const Post = require("../models/posts")
const Comment=require("../models/comment")
const User = require("../models/user")
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate-v2")
const mongoose = require("mongoose")


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
  },
  async paginatePosts(req){
    try{

      let aggregateQuery=[]

      if(req.body.keywords && req.body.keywords !=''){
        const re=new RegExp(`${req.body.keywords}`,'gi')
        aggregateQuery.push({
          $match:{title:{$regex :re}}
        })
      }


      if(req.body.category && req.body.category !==''){
        let categoryArray=req.body.category.map((item)=>{
            mongoose.Types.ObjectId(item)
        })
        aggregateQuery.push({
          $match:{category:{$in:categoryArray}}
        })
      }

      let aggQuery=Post.aggregate(aggregateQuery)
      const options={
        page:req.body.page,
        limit:9,
        sort:{date:"desc"}
      }
      const posts=await Post.aggregatePaginate(aggQuery,options)
      return posts
    }catch(error){
      throw error
    }
  }
}

module.exports={
  categoryService
}