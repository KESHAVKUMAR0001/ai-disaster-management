import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ai_disaster_response';
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected to database: ${conn.connection.name} @ ${conn.connection.host}`);
    return conn;
  } catch (error) {
    isConnected = false;
    console.warn(`[MongoDB Warning] Could not connect to MongoDB at "${uri}".`);
    console.warn(`[MongoDB Info] Running with resilient in-memory data store. Start MongoDB or update MONGO_URI in .env to persist to MongoDB.`);
    return null;
  }
};

export const getDbStatus = () => ({
  connected: isConnected,
  host: isConnected ? mongoose.connection.host : 'In-Memory Fallback',
  name: isConnected ? mongoose.connection.name : 'ai_disaster_response_mem'
});
