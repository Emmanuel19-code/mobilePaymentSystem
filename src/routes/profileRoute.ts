import express from 'express'
import { generateQr, getTransaction } from '../controllers/profileController';
import {authentication} from '../middlewares/authentication'



const router = express.Router();



router.post("/getTransactions",getTransaction);
router.get("/getQrCode",authentication,generateQr)

export default router