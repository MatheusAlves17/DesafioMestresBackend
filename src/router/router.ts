import { Router } from 'express';
import authenticationModule from './authentication.routes';
import moviesModule from './movies.routes';

const router = Router();

router.use('/authentication', authenticationModule)
router.use('/movies', moviesModule)

export default router;