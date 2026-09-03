import { Schema, model } from 'mongoose';

export interface User {
  name: string;
  email: string;
  role: 'member' | 'coach';
  age: number;
  fitnessGoal: string;
}

export interface Team {
  name: string;
  mascot: string;
  memberCount: number;
  weeklyGoalMinutes: number;
}

export interface Activity {
  userEmail: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  activityDate: Date;
}

export interface LeaderboardEntry {
  userEmail: string;
  displayName: string;
  points: number;
  rank: number;
}

export interface Workout {
  title: string;
  focusArea: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  exercises: string[];
}

const userSchema = new Schema<User>(
  {
    age: { type: Number, required: true, min: 13 },
    email: { type: String, required: true, unique: true, trim: true },
    fitnessGoal: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ['member', 'coach'], required: true },
  },
  { timestamps: true },
);

const teamSchema = new Schema<Team>(
  {
    mascot: { type: String, required: true, trim: true },
    memberCount: { type: Number, required: true, min: 1 },
    name: { type: String, required: true, trim: true },
    weeklyGoalMinutes: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

const activitySchema = new Schema<Activity>(
  {
    activityDate: { type: Date, required: true },
    caloriesBurned: { type: Number, required: true, min: 0 },
    durationMinutes: { type: Number, required: true, min: 1 },
    type: { type: String, required: true, trim: true },
    userEmail: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

const leaderboardEntrySchema = new Schema<LeaderboardEntry>(
  {
    displayName: { type: String, required: true, trim: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    userEmail: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

const workoutSchema = new Schema<Workout>(
  {
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [{ type: String, required: true, trim: true }],
    focusArea: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const UserModel = model<User>('User', userSchema);
export const TeamModel = model<Team>('Team', teamSchema);
export const ActivityModel = model<Activity>('Activity', activitySchema);
export const LeaderboardEntryModel = model<LeaderboardEntry>(
  'LeaderboardEntry',
  leaderboardEntrySchema,
);
export const WorkoutModel = model<Workout>('Workout', workoutSchema);
