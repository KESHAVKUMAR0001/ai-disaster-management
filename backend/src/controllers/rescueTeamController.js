import { RescueTeam } from '../models/RescueTeam.js';
import { store } from '../utils/dataStore.js';
import { getDbStatus } from '../config/db.js';

export const getTeams = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected) {
      const teams = await RescueTeam.find();
      return res.json({ success: true, teams, count: teams.length });
    }
    return res.json({ success: true, teams: store.rescueTeams, count: store.rescueTeams.length });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createTeam = async (req, res) => {
  try {
    const { teamName, teamLeader, currentLocation = 'Base Depot', status = 'STANDBY', membersCount = 8, specialization = 'General Rescue', contact = '+1-800-RESCUE' } = req.body;
    const data = { teamName, teamLeader, currentLocation, status, membersCount: Number(membersCount), specialization, contact };
    const { connected } = getDbStatus();

    if (connected) {
      const saved = await RescueTeam.create(data);
      return res.status(201).json({ success: true, team: saved });
    }

    const mockTeam = { _id: 'team_' + Date.now(), ...data };
    store.rescueTeams.push(mockTeam);
    return res.status(201).json({ success: true, team: mockTeam });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTeamStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, currentLocation } = req.body;
    const { connected } = getDbStatus();

    if (connected) {
      const updated = await RescueTeam.findByIdAndUpdate(id, { ...(status && { status }), ...(currentLocation && { currentLocation }) }, { new: true });
      return res.json({ success: true, team: updated });
    }

    const team = store.rescueTeams.find(t => t._id === id);
    if (team) {
      if (status) team.status = status;
      if (currentLocation) team.currentLocation = currentLocation;
    }
    return res.json({ success: true, team });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
