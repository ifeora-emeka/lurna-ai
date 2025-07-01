import { Router } from 'express';
import { setsController } from './sets.controller';
import { validateRequestBody } from '../../middlewares/request.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { createSetRequestSchema } from './set.dto';

const router = Router();

router.post('/create/prompt', authMiddleware, validateRequestBody(createSetRequestSchema), setsController.createSetFromPrompt);
router.post('/create', authMiddleware, validateRequestBody(createSetRequestSchema), setsController.createSet);

export { router as setsRouter };