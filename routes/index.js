const express=require("express")

const router=express.Router()

const authRoute=require("./auth.route")
const categoryRoute=require("./categories.route")

const routeIndex=[{
  path:"/auth",
  route:authRoute
},
{
  path:"/category",
  route:categoryRoute
}
]

routeIndex.forEach((route)=>{
  router.use(route.path,route.route)
})




module.exports=router