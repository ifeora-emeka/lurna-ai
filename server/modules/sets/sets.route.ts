import { Router } from 'express';
import SetsController from './sets.controller';

const router = Router();
const { createSet } = SetsController;

router.get('/create', createSet);

export { router as setsRouter };