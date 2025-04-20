import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Define MONGODB_URI on .env.local');
}

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(MONGODB_URI);
}