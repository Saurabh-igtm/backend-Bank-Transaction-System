const userModel=require("../models/user.model")
const jwt=require("jsonwebtoken")
const emailService = require("../services/email.service")
const tokenBlackListModel = require("../models/blackList.model")

/** 
*user registration controller
*post/api/auth/register
*/


const userRegisterController=async (req,res)=>{

    const {email,name,password}=req.body

    const isExists= await userModel.findOne({
        email:email
    })
    if(isExists){
        return res.status(400).json({
            message:"Email already Exists",
            status:"failed"
        })
    }
    const user=await userModel.create({
        email,password,name
   })
   const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{
    expiresIn:"7d",
    
   })
   res.cookie("token",token)
   res.status(201).json({
    user:{
        _id:user._id,
        email:user.email,
        name:user.name
    },
    token
   }) 
  await emailService.sendRegistrationEmail(user.email,user.name) 
};

   //when something creating then we use the 201 code 
   /**
    * user login Controller
    * POST/api/auth/login
    */

   const userLoginController= async(req,res)=>{
    const {email,password}=req.body

    const user = await userModel.findOne({ email }).select("+password")

    if(!user){
        return res.status(401).json({
            message:"Email or password is INVALID"
        })
    }
    const isValidPassword= await user.comparePassword(password)

    if(!isValidPassword){
        return res.status(401).json({
            message:"Email or Password is Invalid"
        })
    }
    const token= jwt.sign({ userId: user._id},process.env.JWT_SECRET,{
        expiresIn:"3d"
    })
    res.cookie("token",token)
//when we login into application we use the code 200
    res.status(200).json({
        user:{
        _id:user._id,
        email:user.email,
        name:user.name
        },
        token
    });
   }
   /**
    * 
    * User Logout Controller
    * POST/api/auth/logout
    */

   const userLogoutController = async(req,res) =>{
     const token = req.cookies.token || req.headers.authorization?.split(" ")[1 ]
    
     if(!token){
        return res.status(200).json({
            message:"user logout successfully"
        })
     }
     res.cookie("token","")
     await tokenBlackListModel.create({
        token: token
     })
     res.clearCookie("token")
     
     res.status(200).json({
        message:"user logout"
     })
   }


module.exports={
    userRegisterController,
    userLoginController,
    userLogoutController
};
