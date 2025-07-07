import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { assessmentsController } from './assessments.controller';
import { validateRequestBody } from '../../middlewares/request.middleware';
import { generateAssessmentRequestSchema } from './assessments.dto';

const router = Router();

router.post('/generate-assessment', authMiddleware, validateRequestBody(generateAssessmentRequestSchema), assessmentsController.generateAssessment);

export { router as assessmentRouter };