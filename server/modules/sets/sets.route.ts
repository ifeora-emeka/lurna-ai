import { Router } from 'express';
import { createSet } from './sets.controller';

const router = Router();

router.get('/create', createSet);

export { router as setsRouter };