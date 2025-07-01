import { Router } from 'express';
import { authController } from './auth.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

export const authRouter = Router();

authRouter.post('/callback', authController.handleAuthCallback);
authRouter.get('/user', authMiddleware, authController.getCurrentUser);
