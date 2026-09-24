import express from 'express';
import { getIncidentLocations, getResourceLocations, getEmergencyRoutes } from '../controllers/mapController.js';

const router = express.Router();

router.get('/incidents', getIncidentLocations);
router.get('/resources', getResourceLocations);
router.get('/routes', getEmergencyRoutes);

export default router;
