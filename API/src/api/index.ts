import express from 'express';
import MessageResponse from '../interfaces/MessageResponse';
import authRoutes from './auth/auth.routes';
import usersRoutes from './users/users.routes';
import groupsRoutes from './groups/groups.routes';
import lessonRoutes from './lessons/lessons.routes';
import answersRoutes from './answers/answers.routes';
import tasksRoutes from './tasks/tasks.routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/groups', groupsRoutes);
router.use('/lessons', lessonRoutes);
router.use('/tasks', tasksRoutes);
router.use('/answers', answersRoutes);

export default router;
