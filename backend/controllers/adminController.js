import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from "jsonwebtoken"

//API for adding doctor
const addDoctor=async(req,res)=>{
    try{
        const {name,email,password,speciality,degree,address,fees,experience,about}=req.body
        const imageFile=req.file

        if(!name || !email || !password || !speciality || !degree || !experience || !about || !address || !fees){
            return res.json({
                success:"false",
                message:"Missing Details"
            })
        }

        //validating email format
        if(!validator.isEmail(email)){
            return res.json({
                success:"false",
                message:"Please enter a valid email"
            })
        }

        //validating password
        if(password.length<8){
            return res.json({
                success:"false",
                message:"Please enter a strong password"
            })
        }

        const salt=await bcrypt.genSalt(9)
        const hashedPassword=await bcrypt.hash(password,salt)

        const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl=imageUpload.secure_url

        const doctorData={
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            fees,
            about,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor=new doctorModel(doctorData)
        await newDoctor.save()

        res.json({
            success:true,
            message:"Doctor Added"
        })

    }
    catch(err){
        console.log(err)
        res.json({
            success:false,
            message:err.message
        })
    }
}

//API for admin login
const loginAdmin=async(req,res)=>{
    try{
        const {email,password}=req.body

        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({
                success:true,
                token
            })
        }
        else{
            res.json({
                success:false,
                message:"Invalid credentials"
            })
        }
    }
    catch(err){
        console.log(err)
        res.json({
            success:false,
            message:err.message
        })
    }
}

export {addDoctor,loginAdmin}