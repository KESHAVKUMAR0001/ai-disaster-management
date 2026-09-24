import { DisasterReport } from '../models/DisasterReport.js';
import { store } from '../utils/dataStore.js';
import { getDbStatus } from '../config/db.js';
import axios from 'axios';

const calculateSeverity = (type, affected = 0, situation = '') => {
  const t = (type || '').toLowerCase();
  const s = (situation || '').toLowerCase();
  let score = 0.4;

  if (t.includes('flood') || t.includes('earthquake') || t.includes('wildfire') || t.includes('tsunami')) {
    score += 0.3;
  }
  if (affected > 200) score += 0.2;
  else if (affected > 50) score += 0.1;

  if (s.includes('critical') || s.includes('severe') || s.includes('life')) score += 0.2;

  score = Math.min(0.99, score);
  let severity = 'LOW';
  if (score >= 0.8) severity = 'CRITICAL';
  else if (score >= 0.6) severity = 'HIGH';
  else if (score >= 0.4) severity = 'MEDIUM';

  return { score: Number(score.toFixed(2)), severity };
};

export const createReport = async (req, res) => {
  try {
    const {
      disasterType,
      description,
      peopleAffected = 0,
      situation = 'URGENT',
      location = 'General Area',
      locationName = '',
      latitude = 12.9716,
      longitude = 77.5946,
      address = '',
      reportedBy = 'Anonymous',
      contactPhone = ''
    } = req.body;

    if (!disasterType || !description) {
      return res.status(400).json({ success: false, message: 'Disaster type and description are required' });
    }

    // Try AI service for prediction
    let severity = 'MEDIUM';
    let riskScore = 0.6;
    try {
      const aiUrl = process.env.AI_SERVICE_URL || 'http://localhost:5000';
      const aiRes = await axios.post(`${aiUrl}/predict`, {
        disasterType,
        description,
        peopleAffected: Number(peopleAffected),
        location: location || locationName
      }, { timeout: 1500 });

      if (aiRes.data && aiRes.data.prediction) {
        severity = aiRes.data.prediction.severity || severity;
        riskScore = aiRes.data.prediction.riskScore || riskScore;
      }
    } catch (e) {
      const calculated = calculateSeverity(disasterType, Number(peopleAffected), situation);
      severity = calculated.severity;
      riskScore = calculated.score;
    }

    const reportData = {
      disasterType,
      description,
      peopleAffected: Number(peopleAffected),
      situation,
      location: locationName || location,
      locationName: locationName || location,
      latitude: Number(latitude) || 12.9716,
      longitude: Number(longitude) || 77.5946,
      address: address || locationName || location,
      severity,
      riskScore,
      status: 'REPORTED',
      reportedBy,
      contactPhone,
      createdAt: new Date().toISOString()
    };

    const { connected } = getDbStatus();

    if (connected) {
      const saved = await DisasterReport.create(reportData);
      return res.status(201).json({
        success: true,
        message: 'Disaster report submitted successfully',
        report: saved
      });
    }

    // In-memory fallback
    const mockReport = {
      _id: 'rep_' + Date.now(),
      ...reportData
    };
    store.reports.unshift(mockReport);

    return res.status(201).json({
      success: true,
      message: 'Disaster report submitted successfully',
      report: mockReport
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getReports = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected) {
      const reports = await DisasterReport.find().sort({ createdAt: -1 });
      return res.json({ success: true, reports, count: reports.length });
    }
    return res.json({ success: true, reports: store.reports, count: store.reports.length });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const { connected } = getDbStatus();
    if (connected) {
      const report = await DisasterReport.findById(id);
      if (!report) return res.status(404).json({ success: false, message: 'Report not found' });
      return res.json({ success: true, report });
    }
    const report = store.reports.find(r => r._id === id);
    if (!report) return res.status(404).json({ success: false, message: 'Report not found' });
    return res.json({ success: true, report });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { connected } = getDbStatus();

    if (connected) {
      const updated = await DisasterReport.findByIdAndUpdate(id, { status }, { new: true });
      return res.json({ success: true, message: 'Status updated', report: updated });
    }

    const report = store.reports.find(r => r._id === id);
    if (report) report.status = status;
    return res.json({ success: true, message: 'Status updated', report });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
