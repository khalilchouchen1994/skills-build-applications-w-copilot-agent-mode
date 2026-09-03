import mongoose from 'mongoose';
import {
  ActivityModel,
  LeaderboardEntryModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const users = [
  {
    age: 29,
    email: 'maya.chen@example.com',
    fitnessGoal: 'Build endurance for a spring half marathon',
    name: 'Maya Chen',
    role: 'member' as const,
  },
  {
    age: 35,
    email: 'jordan.rivera@example.com',
    fitnessGoal: 'Increase strength while improving mobility',
    name: 'Jordan Rivera',
    role: 'coach' as const,
  },
  {
    age: 24,
    email: 'sam.patel@example.com',
    fitnessGoal: 'Create a consistent weekly activity habit',
    name: 'Sam Patel',
    role: 'member' as const,
  },
];

const teams = [
  {
    mascot: 'Kettlebell Core',
    memberCount: 8,
    name: 'Cardio Crew',
    weeklyGoalMinutes: 900,
  },
  {
    mascot: 'Flex Force',
    memberCount: 6,
    name: 'Strength Squad',
    weeklyGoalMinutes: 720,
  },
];

const activities = [
  {
    activityDate: new Date('2026-08-28T13:30:00Z'),
    caloriesBurned: 410,
    durationMinutes: 45,
    type: 'Outdoor run',
    userEmail: 'maya.chen@example.com',
  },
  {
    activityDate: new Date('2026-08-29T17:15:00Z'),
    caloriesBurned: 320,
    durationMinutes: 40,
    type: 'Strength circuit',
    userEmail: 'jordan.rivera@example.com',
  },
  {
    activityDate: new Date('2026-08-30T12:00:00Z'),
    caloriesBurned: 210,
    durationMinutes: 30,
    type: 'Yoga flow',
    userEmail: 'sam.patel@example.com',
  },
];

const leaderboard = [
  {
    displayName: 'Maya C.',
    points: 1280,
    rank: 1,
    userEmail: 'maya.chen@example.com',
  },
  {
    displayName: 'Jordan R.',
    points: 1125,
    rank: 2,
    userEmail: 'jordan.rivera@example.com',
  },
  {
    displayName: 'Sam P.',
    points: 940,
    rank: 3,
    userEmail: 'sam.patel@example.com',
  },
];

const workouts = [
  {
    difficulty: 'beginner' as const,
    durationMinutes: 25,
    exercises: ['Bodyweight squats', 'Incline pushups', 'Glute bridges'],
    focusArea: 'Full body foundation',
    title: 'Starter Strength Circuit',
  },
  {
    difficulty: 'intermediate' as const,
    durationMinutes: 35,
    exercises: ['Tempo rows', 'Goblet squats', 'Farmer carries'],
    focusArea: 'Strength and posture',
    title: 'Power Posture Builder',
  },
  {
    difficulty: 'advanced' as const,
    durationMinutes: 45,
    exercises: ['Hill repeats', 'Jump lunges', 'Plank shoulder taps'],
    focusArea: 'Cardio power',
    title: 'Endurance Surge Session',
  },
];

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardEntryModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    await Promise.all([
      UserModel.insertMany(users),
      TeamModel.insertMany(teams),
      ActivityModel.insertMany(activities),
      LeaderboardEntryModel.insertMany(leaderboard),
      WorkoutModel.insertMany(workouts),
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
