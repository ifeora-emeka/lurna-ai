import { Router } from 'express';
import { setsController } from './sets.controller';

const router = Router();

router.post('/create', setsController.createSet);

export { router as setsRouter };