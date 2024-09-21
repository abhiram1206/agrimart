// authRoute.js
import express from 'express';
import { Login, SignUp } from '../controllers/authControllers.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/signup', SignUp);
authRouter.post('/signin', Login);

authRouter.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: "You have access to this protected route!" });
});

export default authRouter;
