import express from 'express';
import { signupUser, loginUser } from '../controllers/userAuthController.js';
import verifyToken from '../middleware/userAuthMiddleware.js'

const router = express.Router()
router.post('/usersignup', signupUser)
router.post('/userlogin', loginUser)
router.get('/token', verifyToken, (req, res) => {
    res.json({ success: true, message: `Welcome, user with ID: ${req.user}` });
});

export default router;