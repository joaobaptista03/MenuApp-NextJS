import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Define MONGODB_URI on .env.local');
}

export async function connectDB() {
  console.log('connectDB: Attempting to connect to MongoDB...'); // Log before checking connection state

  if (mongoose.connection.readyState >= 1) {
    console.log('connectDB: MongoDB already connected.'); // Log if already connected
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI);
    console.log('connectDB: MongoDB connected successfully.'); // Log on successful connection
    return db;
  } catch (error) {
    console.error('connectDB: MongoDB connection error:', error); // Log any connection errors
    throw error; // Re-throw the error to be caught by the caller
  }
}