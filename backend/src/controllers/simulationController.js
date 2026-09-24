import { Simulation } from '../models/Simulation.js';
import { store } from '../utils/dataStore.js';
import { getDbStatus } from '../config/db.js';
import axios from 'axios';

export const runSimulation = async (req, res) => {
  try {
    const {
      disasterId = 'DIS_SIM_' + Math.floor(Math.random() * 900 + 100),
      planName = 'Autonomous Strategy Optimization',
      severity = 'HIGH',
      peopleAffected = 150,
      availableResources = 'Emergency Medical Kits, Boats',
      availableTeams = 3
    } = req.body;

    let simulationResult = null;
    const aiUrl = process.env.AI_SERVICE_URL || 'http://localhost:5000';
    try {
      const resp = await axios.post(`${aiUrl}/simulation/run`, {
        severity,
        peopleAffected: Number(peopleAffected),
        availableResources,
        availableTeams: Number(availableTeams)
      }, { timeout: 2000 });
      if (resp.data && resp.data.simulation) {
        simulationResult = resp.data.simulation;
      }
    } catch (e) {
      // Fallback
    }

    const calculatedScore = Math.min(98, Math.max(65, Math.floor(100 - (Number(peopleAffected) / 30) + (Number(availableTeams) * 5))));
    const estTime = Math.max(10, Math.floor(45 - (Number(availableTeams) * 6)));

    const simData = {
      disasterId,
      planName,
      score: simulationResult?.score || calculatedScore,
      responseTime: simulationResult?.estimatedResponseMinutes || estTime,
      status: 'PENDING',
      scenarioDetails: {
        severity,
        peopleAffected: Number(peopleAffected),
        deployedTeams: Number(availableTeams),
        allocatedSupplies: availableResources
      },
      recommendations: simulationResult?.recommendations || [
        `Mobilize ${availableTeams} tactical search units within 15 minutes.`,
        'Establish direct radio link with local hospital triage centers.',
        'Issue targeted citizen SMS notifications for non-impacted evacuation pathways.'
      ],
      createdAt: new Date().toISOString()
    };

    const { connected } = getDbStatus();
    if (connected) {
      const saved = await Simulation.create(simData);
      return res.status(201).json({ success: true, message: 'AI Decision Simulation completed', simulation: saved });
    }

    const mockSim = { _id: 'sim_' + Date.now(), ...simData };
    store.simulations.unshift(mockSim);
    return res.status(201).json({ success: true, message: 'AI Decision Simulation completed', simulation: mockSim });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getSimulation = async (req, res) => {
  try {
    const { simulationId } = req.params;
    const { connected } = getDbStatus();
    if (connected) {
      const sim = await Simulation.findById(simulationId);
      if (!sim) return res.status(404).json({ success: false, message: 'Simulation not found' });
      return res.json({ success: true, simulation: sim });
    }
    const sim = store.simulations.find(s => s._id === simulationId || s.disasterId === simulationId);
    return res.json({ success: true, simulation: sim || store.simulations[0] });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const approveSimulation = async (req, res) => {
  try {
    const { simulationId } = req.params;
    const { connected } = getDbStatus();
    if (connected) {
      await Simulation.findByIdAndUpdate(simulationId, { status: 'APPROVED' });
    } else {
      const sim = store.simulations.find(s => s._id === simulationId);
      if (sim) sim.status = 'APPROVED';
    }
    return res.json({ success: true, message: 'Simulation approved: ' + simulationId });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const overrideSimulation = async (req, res) => {
  try {
    const { simulationId } = req.params;
    const { connected } = getDbStatus();
    if (connected) {
      await Simulation.findByIdAndUpdate(simulationId, { status: 'OVERRIDDEN' });
    } else {
      const sim = store.simulations.find(s => s._id === simulationId);
      if (sim) sim.status = 'OVERRIDDEN';
    }
    return res.json({ success: true, message: 'Simulation overridden: ' + simulationId });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllSimulations = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected) {
      const list = await Simulation.find().sort({ createdAt: -1 });
      return res.json({ success: true, simulations: list });
    }
    return res.json({ success: true, simulations: store.simulations });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
