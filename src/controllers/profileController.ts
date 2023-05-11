import { Request,Response } from "express"
import { StatusCodes } from "http-status-codes"
import qrcode from 'qrcode'
import { user } from "../models/userModels"
import {SendMoneyReceived}  from "../utils/MailNotification"


const sendMoney = async (req:Request,res:Response) =>{
    const {receiver,amount} = req.body
    //@ts-ignore
    const Idnumber = req.user.Idnumber
    if(!receiver || !amount){
        return res.status(StatusCodes.BAD_REQUEST).json({
            msg:"fields cannot be empty"
        })
    }
    const senderProfile = await user.findOne({Idnumber})
    const receiverProfile = await user.findOne({receiver})
    if(!receiverProfile){
        return res.status(StatusCodes.BAD_REQUEST).json({
            msg:"Account holder cannot be found"
        })
    }
    receiverProfile.balance += amount
    receiverProfile.save();
    res.status(StatusCodes.OK).json({
        msg:"You money has been sent"
    })
}

const depositMoney = (req:Request,res:Response) =>{

}

const withdrawMoney = (req:Request,res:Response)=>{

}

const getTransaction = (req:Request,res:Response)=>{

}

const generateQr = (req:Request,res:Response) =>{
    //@ts-ignore
     const Idnumber = req.user.Idnumber
   const data=qrcode.toDataURL(Idnumber)
   res.send(data)
}


export {
    sendMoney,
    withdrawMoney,
    getTransaction,
    generateQr,
    depositMoney
}