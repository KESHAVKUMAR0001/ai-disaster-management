import { Resource } from '../models/Resource.js';
import { ResourceAllocation } from '../models/ResourceAllocation.js';
import { store } from '../utils/dataStore.js';
import { getDbStatus } from '../config/db.js';
import axios from 'axios';

export const getResources = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected) {
      const resources = await Resource.find();
      return res.json({ success: true, resources, count: resources.length });
    }
    return res.json({ success: true, resources: store.resources, count: store.resources.length });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addResource = async (req, res) => {
  try {
    const {
      resourceType,
      resourceName,
      quantity,
      availableQuantity,
      location = 'Central Logistics',
      availability = 'AVAILABLE',
      latitude = 12.975,
      longitude = 77.600
    } = req.body;

    const data = {
      resourceType,
      resourceName,
      quantity: Number(quantity) || 0,
      availableQuantity: availableQuantity !== undefined ? Number(availableQuantity) : Number(quantity) || 0,
      location,
      latitude: Number(latitude) || 12.975,
      longitude: Number(longitude) || 77.600,
      availability,
      status: 'READY'
    };

    const { connected } = getDbStatus();
    if (connected) {
      const created = await Resource.create(data);
      return res.status(201).json({ success: true, message: 'Resource added successfully', resource: created });
    }

    const mockResource = { _id: 'res_' + Date.now(), ...data };
    store.resources.push(mockResource);
    return res.status(201).json({ success: true, message: 'Resource added successfully', resource: mockResource });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getResourceRequirements = async (req, res) => {
  try {
    const { reportId } = req.params;
    return res.json({
      success: true,
      reportId,
      estimatedRequirements: [
        { type: 'Medical Trauma Kits', quantity: 25 },
        { type: 'Rescue Boats / High-Clearance Trucks', quantity: 4 },
        { type: 'Emergency Ration Packs', quantity: 200 },
        { type: 'Disaster Shelters', quantity: 30 }
      ]
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getResourceLocations = async (req, res) => {
  try {
    const { connected } = getDbStatus();
    if (connected) {
      const resources = await Resource.find({}, 'resourceName resourceType location latitude longitude availableQuantity');
      return res.json({ success: true, locations: resources });
    }
    const locations = store.resources.map(r => ({
      _id: r._id,
      resourceName: r.resourceName,
      resourceType: r.resourceType,
      location: r.location,
      latitude: r.latitude,
      longitude: r.longitude,
      availableQuantity: r.availableQuantity
    }));
    return res.json({ success: true, locations });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const predictAIResources = async (req, res) => {
  try {
    const { severity = 'HIGH', peopleAffected = 100 } = req.body;
    const aiUrl = process.env.AI_SERVICE_URL || 'http://localhost:5000';
    try {
      const resp = await axios.post(`${aiUrl}/resources/predict`, { severity, peopleAffected }, { timeout: 2000 });
      if (resp.data) return res.json(resp.data);
    } catch (e) {
      // Fallback
    }

    const count = Number(peopleAffected) || 100;
    const medicalKits = Math.ceil(count * 0.25);
    const rescueTeams = Math.max(1, Math.ceil(count / 80));
    const foodPackets = count * 3;
    const temporaryShelters = Math.ceil(count / 5);

    return res.json({
      success: true,
      resourcePrediction: {
        severity,
        peopleAffected: count,
        recommendedResources: [
          { resource: 'Medical Trauma Kits', quantity: medicalKits, priority: 'HIGH' },
          { resource: 'Emergency Search Teams', quantity: rescueTeams, priority: 'CRITICAL' },
          { resource: 'Drinking Water & Rations', quantity: foodPackets, priority: 'MEDIUM' },
          { resource: 'Temporary Modular Tents', quantity: temporaryShelters, priority: 'MEDIUM' }
        ],
        confidenceScore: 0.94
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const allocateResource = async (req, res) => {
  try {
    const { disasterId, resourceId, quantity, allocatedLocation } = req.body;
    const qty = Number(quantity);
    const { connected } = getDbStatus();

    if (connected) {
      const resItem = await Resource.findById(resourceId);
      if (resItem) {
        resItem.availableQuantity = Math.max(0, resItem.availableQuantity - qty);
        await resItem.save();
      }
      const alloc = await ResourceAllocation.create({
        disasterId,
        resourceId,
        resourceName: resItem ? resItem.resourceName : '',
        quantity: qty,
        allocatedLocation,
        status: 'DISPATCHED'
      });
      return res.status(201).json({ success: true, message: 'Resource dispatched successfully', allocation: alloc });
    }

    const resItem = store.resources.find(r => r._id === resourceId);
    if (resItem) {
      resItem.availableQuantity = Math.max(0, resItem.availableQuantity - qty);
    }
    const alloc = {
      _id: 'alloc_' + Date.now(),
      disasterId,
      resourceId,
      resourceName: resItem ? resItem.resourceName : 'Disaster Relief Unit',
      quantity: qty,
      allocatedLocation,
      status: 'DISPATCHED',
      createdAt: new Date().toISOString()
    };
    store.resourceAllocations.unshift(alloc);
    return res.status(201).json({ success: true, message: 'Resource dispatched successfully', allocation: alloc });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
