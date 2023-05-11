import {NextFunction, Request,Response} from "express";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken'




const authentication = (req:Request,res:Response,next:NextFunction) =>{
   const token = req.cookies.token;   
   if(!token){
     return res.status(StatusCodes.UNAUTHORIZED).json({
        msg:"Please you can't access this page"
     })
   }
   const payload = jwt.verify(token,process.env.JWT_SECRET as string)
    //@ts-ignore
    req.user= payload 
   next()
}

export {
    authentication
}