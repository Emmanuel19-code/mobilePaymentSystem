import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {v4 as uuid} from 'uuid'

interface user {
    Idnumber:string
    name:string;
    age:number;
    email:string;
    password:string;
    phoneOne:string;
    phoneTwo?:string;
    balance:number;
    currency:string;
    verified:boolean;
    accountnumber:string
}

interface userMethods{
    [value:string]:any
}

const userId=uuid().split('-')[0]
const userSchema = new mongoose.Schema<user,userMethods>({
     Idnumber:{
      type:String,
      default:userId
     },
     name:{
        type:String,
     },
     age:{
        type:Number
     },
     email:{
        type:String
     },
     password:{
        type:String
     },
     phoneOne:{
        type:String
     },
     phoneTwo:{
        type:String
     },
     balance:{
      type:Number,
      default:0.00
     },
     currency:{
        type:String
     },
     accountnumber:{
        type:String
     },
     verified:{
        type:Boolean,
        default:false
     }
},{timestamps:true})


 userSchema.pre("save",async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
 })



userSchema.methods.createJWT = function () {
  return jwt.sign(
    { Idnumber: this.Idnumber, name: this.name},
    process.env.JWT_SECRET as any,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  )
}


userSchema.methods.GenerateOTP = function (){
    let otp:string=""
    let i:number;
      for(i=0;i<=3;i++){
       let rand= Math.floor(Math.random()*9)
       otp+=rand
      }
      return otp
}


userSchema.methods.comparePassword = async function (password:string):Promise<Boolean>{
    const isMatch = await bcrypt.compare(password,this.password)
    return isMatch
}

const user = mongoose.model<user,userMethods>("userprofile",userSchema)
export {
    user
}