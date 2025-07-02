import { Router } from 'express';
import { unitsController } from './units.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/generate/:moduleId', authMiddleware, unitsController.generateUnitsForModule);

export { router as unitsRouter };
