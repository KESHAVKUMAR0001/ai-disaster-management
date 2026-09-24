import express from 'express';
import { getDashboardStats } from '../controllers/authorityController.js';
import { getReports } from '../controllers/reportController.js';
import { getResources } from '../controllers/resourceController.js';

const router = express.Router();

router.get('/dashboard', getDashboardStats);
router.get('/reports', getReports);
router.get('/resources', getResources);

export default router;
