import { Feedback } from '../models/Feedback.js';
import { Notification } from '../models/Notification.js';
import { store } from '../utils/dataStore.js';
import { getDbStatus } from '../config/db.js';

export const getHealth = (req, res) => {
  const db = getDbStatus();
  return res.json({
    status: 'UP',
    service: 'AI-Disaster-Response-Node-Express-Backend',
    timestamp: new Date().toISOString(),
    database: {
      type: 'MongoDB / Mongoose',
      status: db.connected ? 'CONNECTED' : 'IN_MEMORY_RESILIENT_MODE',
      host: db.host,
      database: db.name
    },
    version: '2.0.0-MERN'
  });
};

export const getFeedback = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected) {
      const items = await Feedback.find().sort({ createdAt: -1 });
      return res.json({ success: true, feedback: items });
    }
    return res.json({ success: true, feedback: store.feedback });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const submitFeedback = async (req, res) => {
  try {
    const { rating, feedbackText, userId = 'citizen_user', userName = 'Citizen' } = req.body;
    if (!rating || !feedbackText) {
      return res.status(400).json({ success: false, message: 'Rating and text required' });
    }
    const data = { rating: Number(rating), feedbackText, userId, userName, createdAt: new Date().toISOString() };
    const { connected } = getDbStatus();
    if (connected) {
      const saved = await Feedback.create(data);
      return res.status(201).json({ success: true, message: 'Thank you for your feedback', feedback: saved });
    }
    const mock = { _id: 'fb_' + Date.now(), ...data };
    store.feedback.unshift(mock);
    return res.status(201).json({ success: true, message: 'Thank you for your feedback', feedback: mock });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getNotifications = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected) {
      const list = await Notification.find().sort({ createdAt: -1 });
      return res.json({ success: true, notifications: list });
    }
    return res.json({ success: true, notifications: store.notifications });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createNotification = async (req, res) => {
  try {
    const { recipient = 'All Citizens', message, notificationType = 'INFO' } = req.body;
    const data = { recipient, message, notificationType, status: 'UNREAD', createdAt: new Date().toISOString() };
    const { connected } = getDbStatus();
    if (connected) {
      const saved = await Notification.create(data);
      return res.status(201).json({ success: true, notification: saved });
    }
    const mock = { _id: 'notif_' + Date.now(), ...data };
    store.notifications.unshift(mock);
    return res.status(201).json({ success: true, notification: mock });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
