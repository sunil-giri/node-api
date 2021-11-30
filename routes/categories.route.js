const express=require("express")
const { categoryController } = require("../controllers/categories.controller")
const auth = require("../middlewares/auth")
const router=express.Router()
const uploadOptions=require("../helpers/multer")


router.post("/",auth(),categoryController.createCategory)
router.post("/posts",auth(),uploadOptions.array('images', 10),categoryController.createPost)
router.post("/posts/comment",auth(),categoryController.createComment)
// router.get("/",auth())
// router.get("/posts",auth())
router.post("/paginate/all",categoryController.paginatePosts)

module.exports=router