import { Router } from 'express';
import { learningPathController } from './learning-path.controller';
import { validateRequestBody } from '../../middlewares/request.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { createLearningPathRequestSchema, getNextStepsRequestSchema } from './learning-path.dto';

const router = Router();

router.post('/create', authMiddleware, validateRequestBody(createLearningPathRequestSchema), learningPathController.createLearningPath);
router.post('/next', authMiddleware, validateRequestBody(getNextStepsRequestSchema), learningPathController.getNextSteps);


export { router as learningPathRouter };
