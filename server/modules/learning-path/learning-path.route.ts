import { Router } from 'express';
import { learningPathController } from './learning-path.controller';
import { validateRequestBody } from '../../middlewares/request.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { createLearningPathRequestSchema } from './learning-path.dto';

const router = Router();

router.post('/create', authMiddleware, validateRequestBody(createLearningPathRequestSchema), learningPathController.createLearningPath);

export { router as learningPathRouter };
