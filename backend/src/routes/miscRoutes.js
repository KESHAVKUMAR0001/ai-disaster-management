import express from 'express';
import { getHealth, getFeedback, submitFeedback, getNotifications, createNotification } from '../controllers/miscController.js';

const router = express.Router();

router.get('/health', getHealth);
router.get('/feedback', getFeedback);
router.post('/feedback', submitFeedback);
router.get('/notifications', getNotifications);
router.post('/notifications', createNotification);

export default router;
