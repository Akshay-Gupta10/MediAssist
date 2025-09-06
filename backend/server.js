import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectCloudinary from "./config/cloudinary.js"
import connectDB from "./config/mongodb.js"
import adminRouter from "./routes/adminRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import userRouter from "./routes/userRoute.js"

const app=express()
const port=process.env.PORT || 8000
connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)



app.get('/',(req,res)=>{
    res.send('API working')
})

app.listen(port,()=> console.log(`Server started at port ${port}`))