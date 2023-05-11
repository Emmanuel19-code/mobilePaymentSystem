import express  from "express";
import cookieParser from "cookie-parser";
import { connection } from "./db/connection";
import { config } from "./config/config";
import authRoute from "./routes/authRoute"
import passport from "passport";
import cors from 'cors'

const app = express();
const port =5000 || process.env.PORT
app.use(express.json());
app.use(cookieParser())
app.use(passport.initialize())
app.use(cors())


app.use("/",authRoute)







app.listen(port,()=>{
    console.log("server up and running");
})
connection(config.mongo.uri)
