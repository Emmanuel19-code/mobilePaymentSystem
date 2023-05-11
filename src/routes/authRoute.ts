import express from 'express'
import { createAccount, googleAuthentication, googleCallback, verifyAccount } from '../controllers/authController';
import { authentication } from '../middlewares/authentication';
const router = express.Router();


router.post("/create-account",createAccount)
router.post("/verify-account",authentication,verifyAccount)
router.get("/auth/google",googleAuthentication)
router.get("/auth/google/callback",googleCallback)

export default router


