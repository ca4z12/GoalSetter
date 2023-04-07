import Router from 'express';
import { 
    registerUser,
    loginUser, 
    getMe } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const userRoutes = Router();

userRoutes.post('/', registerUser)
userRoutes.get('/login', loginUser)
userRoutes.get('/me', authMiddleware, getMe)


export { userRoutes }

