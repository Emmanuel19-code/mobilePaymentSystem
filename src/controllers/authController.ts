import { user } from "../models/userModels";
import { Request,Response } from "express";
import StatusCodes from "http-status-codes"
import { otpmodel } from "../models/tokenSchema";
import passport from "passport";



const createAccount =async (req:Request,res:Response) =>{
    const {
        name,
        email,
        phoneOne,
        phoneTwo,
        password,
        currency,
        age
    }=req.body
    if(!name || !email || !phoneOne || !password || !currency || !age){
        return res.status(StatusCodes.BAD_REQUEST).json({
             msg:"Please field cannot be empty"
        })
    }
    const createProfile = await user.create(req.body)
    if(!createProfile){
        return res.json({
            msg:"Account not create please try again"
        })
    }
    const otp = await createProfile.GenerateOTP
    const storeotp = await otpmodel.create({
        owner:createProfile.Idnumber,
        otp:otp
    })
    const token = await createProfile.createJWT()
    res.cookie("token",token)
   res.status(StatusCodes.CREATED).json({
    msg:"Please check your email for OTP to verify your account"
   })
}


const verifyAccount = async (req:Request,res:Response) =>{
    const {otpkey} = req.body
    if(!otpkey){
        res.status(StatusCodes.BAD_REQUEST).json({
            msg:"Field cannot be empty"
        })
    }
   //@ts-ignore
   const Idnumber = req.user.Idnumber
   const userInfo = await otpmodel.findOne({Idnumber})
   const isMatch = await userInfo.compareToken(otpkey)
    if(!isMatch){
        res.status(StatusCodes.BAD_REQUEST).json({
            msg:"Invalid credentials"
        })
    }
    userInfo.verified = true
    userInfo.save();
   res.json({
    msg:"Your account has been verified"
   })
}

const googleAuthentication = () =>{
    //passport.authenticate('google',{
    //    scope:['email','profile']
    //})
    return passport.authenticate('google')
}

const googleCallback = () =>{
    return passport.authenticate('google',{
        successRedirect:"/auth/google/success",
        failureRedirect:"/auth/google/failure"
    })
}

export {
    createAccount,
    verifyAccount,
    googleAuthentication,
    googleCallback
}