import express from 'express';
import { signupUser, loginUser } from '../controllers/userAuthController.js';

const router = express.Router()
router.post('/usersignup', signupUser)
router.post('/userlogin', loginUser)

export default router;