import { Router } from 'express';
import { assessmentResultController } from './assessment-result.controller';
import { validateRequestBody } from '../../middlewares/request.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { submitAssessmentAnswersSchema } from './assessment-result.dto';

const router = Router();

router.post('/submit', authMiddleware, validateRequestBody(submitAssessmentAnswersSchema), assessmentResultController.submitAnswers);

export { router as assessmentResultRouter };