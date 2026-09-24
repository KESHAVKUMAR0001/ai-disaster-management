import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User.js';
import { DisasterReport } from './models/DisasterReport.js';
import { Resource } from './models/Resource.js';
import { Alert } from './models/Alert.js';
import { RescueTeam } from './models/RescueTeam.js';
import { EmergencyRoute } from './models/EmergencyRoute.js';
import { Simulation } from './models/Simulation.js';
import { store } from './utils/dataStore.js';

dotenv.config();

const seed = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ai_disaster_response';
    await mongoose.connect(uri);
    console.log('[Seed] Connected to MongoDB for seeding...');

    // Clear existing collections
    await User.deleteMany({});
    await DisasterReport.deleteMany({});
    await Resource.deleteMany({});
    await Alert.deleteMany({});
    await RescueTeam.deleteMany({});
    await EmergencyRoute.deleteMany({});
    await Simulation.deleteMany({});

    // Insert Users
    await User.insertMany(store.users.map(({ _id, ...u }) => u));
    console.log('✓ Users seeded');

    // Insert Reports
    await DisasterReport.insertMany(store.reports.map(({ _id, ...r }) => r));
    console.log('✓ Disaster Reports seeded');

    // Insert Resources
    await Resource.insertMany(store.resources.map(({ _id, ...res }) => res));
    console.log('✓ Resources seeded');

    // Insert Alerts
    await Alert.insertMany(store.alerts.map(({ _id, ...a }) => a));
    console.log('✓ Alerts seeded');

    // Insert Rescue Teams
    await RescueTeam.insertMany(store.rescueTeams.map(({ _id, ...t }) => t));
    console.log('✓ Rescue Teams seeded');

    // Insert Routes
    await EmergencyRoute.insertMany(store.emergencyRoutes.map(({ _id, ...rt }) => rt));
    console.log('✓ Emergency Routes seeded');

    // Insert Simulations
    await Simulation.insertMany(store.simulations.map(({ _id, ...s }) => s));
    console.log('✓ Simulations seeded');

    console.log('🚀 [Seed Complete] All initial MERN data successfully populated into MongoDB!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error);
    process.exit(1);
  }
};

seed();
