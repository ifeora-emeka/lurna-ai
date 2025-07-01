import { Router } from 'express';
import { modulesController } from './modules.controller';
import { validateRequestBody } from '../../middlewares/request.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { generateModulesRequestSchema } from './module.dto';

const router = Router();

router.post('/generate/:setSlug', authMiddleware, modulesController.generateModulesForSet);

export { router as modulesRouter };
