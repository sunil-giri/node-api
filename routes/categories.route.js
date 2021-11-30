const express=require("express")
const { categoryController } = require("../controllers/categories.controller")
const auth = require("../middlewares/auth")
const router=express.Router()


router.post("/",auth(),categoryController.createCategory)
router.post("/posts",auth(),categoryController.createPost)
router.post("/posts/comment",auth(),categoryController.createComment)
// router.get("/",auth())
// router.get("/posts",auth())
router.post("/paginate/all",categoryController.paginatePosts)

module.exports=router