import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectCloudinary from "./config/cloudinary.js"
import connectDB from "./config/mongodb.js"

const app=express()
const port=process.env.PORT || 8000
connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('API working')
})

app.listen(port,()=> console.log(`Server started at port ${port}`))