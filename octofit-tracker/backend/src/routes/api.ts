import { Router } from 'express';
import {
  ActivityModel,
  LeaderboardEntryModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models/index.js';

const router = Router();

router.get('/users/', async (_request, response, next) => {
  try {
    const users = await UserModel.find().sort({ name: 1 });
    response.json({ users });
  } catch (error) {
    next(error);
  }
});

router.get('/teams/', async (_request, response, next) => {
  try {
    const teams = await TeamModel.find().sort({ name: 1 });
    response.json({ teams });
  } catch (error) {
    next(error);
  }
});

router.get('/activities/', async (_request, response, next) => {
  try {
    const activities = await ActivityModel.find().sort({ activityDate: -1 });
    response.json({ activities });
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard/', async (_request, response, next) => {
  try {
    const leaderboard = await LeaderboardEntryModel.find().sort({ rank: 1 });
    response.json({ leaderboard });
  } catch (error) {
    next(error);
  }
});

router.get('/workouts/', async (_request, response, next) => {
  try {
    const workouts = await WorkoutModel.find().sort({ title: 1 });
    response.json({ workouts });
  } catch (error) {
    next(error);
  }
});

export default router;
