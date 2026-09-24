import { DisasterReport } from '../models/DisasterReport.js';
import { Resource } from '../models/Resource.js';
import { RescueTeam } from '../models/RescueTeam.js';
import { Alert } from '../models/Alert.js';
import { store } from '../utils/dataStore.js';
import { getDbStatus } from '../config/db.js';

export const getDashboardStats = async (req, res) => {
  try {
    const { connected } = getDbStatus();

    let totalReports = 0;
    let criticalReports = 0;
    let inProgressReports = 0;
    let totalResources = 0;
    let availableResourcesCount = 0;
    let deployedTeams = 0;
    let activeAlerts = 0;
    let recentReports = [];
    let recentAlerts = [];

    if (connected) {
      totalReports = await DisasterReport.countDocuments();
      criticalReports = await DisasterReport.countDocuments({ severity: { $in: ['HIGH', 'CRITICAL'] } });
      inProgressReports = await DisasterReport.countDocuments({ status: 'IN_PROGRESS' });
      const resources = await Resource.find();
      totalResources = resources.reduce((acc, r) => acc + (r.quantity || 0), 0);
      availableResourcesCount = resources.reduce((acc, r) => acc + (r.availableQuantity || 0), 0);
      deployedTeams = await RescueTeam.countDocuments({ status: 'DEPLOYED' });
      activeAlerts = await Alert.countDocuments({ active: true });
      recentReports = await DisasterReport.find().sort({ createdAt: -1 }).limit(5);
      recentAlerts = await Alert.find().sort({ createdAt: -1 }).limit(4);
    } else {
      totalReports = store.reports.length;
      criticalReports = store.reports.filter(r => r.severity === 'HIGH' || r.severity === 'CRITICAL').length;
      inProgressReports = store.reports.filter(r => r.status === 'IN_PROGRESS').length;
      totalResources = store.resources.reduce((acc, r) => acc + (r.quantity || 0), 0);
      availableResourcesCount = store.resources.reduce((acc, r) => acc + (r.availableQuantity || 0), 0);
      deployedTeams = store.rescueTeams.filter(t => t.status === 'DEPLOYED').length;
      activeAlerts = store.alerts.filter(a => a.active).length;
      recentReports = store.reports.slice(0, 5);
      recentAlerts = store.alerts.slice(0, 4);
    }

    return res.json({
      success: true,
      data: {
        totalReports,
        criticalReports,
        inProgressReports,
        totalResources,
        availableResourcesCount,
        deployedTeams,
        activeAlerts,
        resourceUtilizationRate: totalResources > 0 ? Math.round(((totalResources - availableResourcesCount) / totalResources) * 100) : 32,
        recentReports,
        recentAlerts
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
