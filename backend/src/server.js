import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB, getDbStatus } from './config/db.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import predictionRoutes from './routes/predictionRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import simulationRoutes from './routes/simulationRoutes.js';
import alertRoutes from './routes/alertRoutes.js';
import rescueTeamRoutes from './routes/rescueTeamRoutes.js';
import mapRoutes from './routes/mapRoutes.js';
import authorityRoutes from './routes/authorityRoutes.js';
import miscRoutes from './routes/miscRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.join(__dirname, '../../frontend');

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

// Serve original static frontend files (HTML/CSS/JS)
app.use(express.static(frontendDir));

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/ai/resources', predictionRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/simulation', simulationRoutes);
app.use('/api/ai/simulation', simulationRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/ai/alert', alertRoutes);
app.use('/api/ai/alerts', alertRoutes);
app.use('/api/rescue-teams', rescueTeamRoutes);
app.use('/api/map', mapRoutes);
app.use('/api/authority', authorityRoutes);
app.use('/api', miscRoutes);

// Root redirect to original frontend entry point
app.get('/', (req, res) => {
  res.redirect('/html/index.html');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

// Start Server
app.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🚀 MERN Backend listening on http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log('====================================================');
});
