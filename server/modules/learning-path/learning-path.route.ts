import { Router } from 'express';
import { learningPathController } from './learning-path.controller';
import { validateRequestBody } from '../../middlewares/request.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { createLearningPathRequestSchema, getNextStepsRequestSchema, generateAssessmentRequestSchema } from './learning-path.dto';

const router = Router();

router.post('/create', authMiddleware, validateRequestBody(createLearningPathRequestSchema), learningPathController.createLearningPath);
router.post('/next', authMiddleware, validateRequestBody(getNextStepsRequestSchema), learningPathController.getNextSteps);
router.post('/generate-assessment', authMiddleware, validateRequestBody(generateAssessmentRequestSchema), learningPathController.generateAssessment);

export { router as learningPathRouter };
