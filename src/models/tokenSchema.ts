import bcrypt from 'bcryptjs'
import mongoose from "mongoose";


interface otp{
    owner:string;
    otpvalue:string;
}


interface otpmethods{
    [value:string]:any
}


const tokenSchema = new mongoose.Schema<otp,otpmethods>({
     owner:{
        type:String
     },
     otpvalue:{
        type:String
     }
},{timestamps:true})


tokenSchema.pre("save",async function(){
    const salt = await bcrypt.genSalt(10);
    this.otpvalue =await  bcrypt.hash(this.otpvalue,salt)
})


tokenSchema.methods.compareToken = async function (token:string) {
    const isMatch = await bcrypt.compare(token,this.otpvalue)
    return isMatch
}

const otpmodel = mongoose.model<otp,otpmethods>("otp_value",tokenSchema)
export {
    otpmodel
}