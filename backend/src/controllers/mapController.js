import { DisasterReport } from '../models/DisasterReport.js';
import { Resource } from '../models/Resource.js';
import { EmergencyRoute } from '../models/EmergencyRoute.js';
import { store } from '../utils/dataStore.js';
import { getDbStatus } from '../config/db.js';

export const getIncidentLocations = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected) {
      const reports = await DisasterReport.find({}, 'disasterType location latitude longitude severity peopleAffected status address');
      return res.json({ success: true, incidents: reports });
    }
    const incidents = store.reports.map(r => ({
      _id: r._id,
      disasterType: r.disasterType,
      location: r.location,
      latitude: r.latitude,
      longitude: r.longitude,
      severity: r.severity,
      peopleAffected: r.peopleAffected,
      status: r.status,
      address: r.address
    }));
    return res.json({ success: true, incidents });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getResourceLocations = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected) {
      const resources = await Resource.find({}, 'resourceName resourceType location latitude longitude availableQuantity availability');
      return res.json({ success: true, resources });
    }
    const resources = store.resources.map(r => ({
      _id: r._id,
      resourceName: r.resourceName,
      resourceType: r.resourceType,
      location: r.location,
      latitude: r.latitude,
      longitude: r.longitude,
      availableQuantity: r.availableQuantity,
      availability: r.availability
    }));
    return res.json({ success: true, resources });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getEmergencyRoutes = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected) {
      const routes = await EmergencyRoute.find();
      return res.json({ success: true, routes });
    }
    return res.json({ success: true, routes: store.emergencyRoutes });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
