import authRouter from './auth';
import issueRouter from './issue';
import projectRouter from './project';
import eventRouter from './event';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRouter);
router.use('/issue', issueRouter);
router.use('/project', projectRouter);
router.use('/event', eventRouter);

export default router;