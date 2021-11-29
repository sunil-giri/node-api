const express=require("express")
const mongoose=require("mongoose")
const passport = require("passport")
const { jwtStrategy } = require("./middlewares/passport")
const app= express()
const routes=require("./routes")
require("dotenv").config()

mongoose.connect(`${process.env.DB_STRING}`,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
},()=>{
  console.log("DB connected")
})


app.use(express.json())


app.use(passport.initialize())
passport.use("jwt",jwtStrategy)

app.use("/api",routes)



const port=process.env.PORT||5000

app.listen(port,()=>{
  console.log(`Server started at port ${port}`)
})