import { Alert } from '../models/Alert.js';
import { store } from '../utils/dataStore.js';
import { getDbStatus } from '../config/db.js';
import axios from 'axios';

export const getAlerts = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected) {
      const alerts = await Alert.find().sort({ createdAt: -1 });
      return res.json({ success: true, alerts, count: alerts.length });
    }
    return res.json({ success: true, alerts: store.alerts, count: store.alerts.length });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createAlert = async (req, res) => {
  try {
    const {
      message,
      alertType = 'EVACUATION',
      location = 'All Sectors',
      priority = 'HIGH',
      actionRequired = 'Follow designated evacuation routes immediately'
    } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, message: 'Alert message is required' });
    }

    const alertData = {
      message,
      alertType,
      location,
      priority,
      active: true,
      actionRequired,
      broadcastedBy: 'Emergency Command Operations',
      createdAt: new Date().toISOString()
    };

    const { connected } = getDbStatus();
    if (connected) {
      const saved = await Alert.create(alertData);
      return res.status(201).json({ success: true, message: 'Alert broadcasted successfully', alert: saved });
    }

    const mockAlert = { _id: 'alt_' + Date.now(), ...alertData };
    store.alerts.unshift(mockAlert);
    return res.status(201).json({ success: true, message: 'Alert broadcasted successfully', alert: mockAlert });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const generateAIAlert = async (req, res) => {
  try {
    const { severity = 'HIGH', riskLevel = 'HIGH', location = 'Identified Zone', peopleAffected = 100 } = req.body;
    const aiUrl = process.env.AI_SERVICE_URL || 'http://localhost:5000';
    try {
      const resp = await axios.post(`${aiUrl}/alert/generate`, {
        severity,
        riskLevel,
        location,
        peopleAffected: Number(peopleAffected)
      }, { timeout: 2000 });
      if (resp.data) return res.json(resp.data);
    } catch (e) {
      // Fallback
    }

    return res.json({
      success: true,
      alert: {
        severity,
        riskLevel,
        location,
        recommendedAction: `Immediate Level-2 emergency protocol activation. Evacuate ${peopleAffected} citizens to safe zones.`,
        priorityLevel: severity === 'CRITICAL' ? 'CRITICAL' : 'HIGH',
        broadcastTemplate: `URGENT ADVISORY: ${severity} threat declared in ${location}. Please move immediately to the nearest designated shelter.`
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
