import express from 'express';
import { getAlerts, createAlert, generateAIAlert } from '../controllers/alertController.js';

const router = express.Router();

router.get('/', getAlerts);
router.post('/', createAlert);
router.post('/generate', generateAIAlert);

export default router;
