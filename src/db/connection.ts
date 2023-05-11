import mongoose from "mongoose";

export const connection = (uri:string)=>{
   try {
    mongoose.connect(uri)
    console.log("connected to the database");
   } catch (error) {
     console.log("could not connect to the database");
   }
}