import { Router } from 'express';

const router = Router();

router.get('/users/', (_request, response) => {
  response.json({ users: [] });
});

router.get('/teams/', (_request, response) => {
  response.json({ teams: [] });
});

router.get('/activities/', (_request, response) => {
  response.json({ activities: [] });
});

router.get('/leaderboard/', (_request, response) => {
  response.json({ leaderboard: [] });
});

router.get('/workouts/', (_request, response) => {
  response.json({ workouts: [] });
});

export default router;
