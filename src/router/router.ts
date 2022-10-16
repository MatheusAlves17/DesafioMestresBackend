import { Router } from 'express';
import authenticationModule from './authentication.routes';

const router = Router();

router.use('/authentication', authenticationModule)

export default router;