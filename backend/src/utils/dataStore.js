// Resilient in-memory store preloaded with realistic disaster management data
export const store = {
  users: [
    {
      _id: 'user_1',
      name: 'Admin Commander',
      email: 'admin@disaster.gov',
      password: 'password123',
      role: 'authority',
      phone: '+1-555-0100',
      location: 'Emergency Operations Center'
    },
    {
      _id: 'user_2',
      name: 'Jane Citizen',
      email: 'citizen@example.com',
      password: 'password123',
      role: 'citizen',
      phone: '+1-555-0199',
      location: 'Downtown Riverside'
    }
  ],
  reports: [
    {
      _id: 'rep_1',
      disasterType: 'Flood',
      description: 'Severe flash flooding near riverfront boulevard. Multiple residential buildings stranded.',
      peopleAffected: 320,
      situation: 'CRITICAL',
      location: 'Riverside District',
      locationName: 'Riverside District',
      latitude: 12.9716,
      longitude: 77.5946,
      address: '42 Waterway Avenue',
      severity: 'HIGH',
      riskScore: 0.88,
      status: 'IN_PROGRESS',
      reportedBy: 'Jane Citizen',
      createdAt: new Date().toISOString()
    },
    {
      _id: 'rep_2',
      disasterType: 'Earthquake',
      description: 'Magnitude 5.8 tremor resulting in structural fissures and cracked roadway.',
      peopleAffected: 150,
      situation: 'URGENT',
      location: 'Northridge Hills',
      locationName: 'Northridge Hills',
      latitude: 12.9902,
      longitude: 77.5521,
      address: '109 Hilltop Road',
      severity: 'MEDIUM',
      riskScore: 0.65,
      status: 'VERIFIED',
      reportedBy: 'Local Patrol',
      createdAt: new Date(Date.now() - 3600000).toISOString()
    },
    {
      _id: 'rep_3',
      disasterType: 'Wildfire',
      description: 'Brush fire rapidly spreading towards suburban perimeter driven by 40km/h winds.',
      peopleAffected: 450,
      situation: 'CRITICAL',
      location: 'Pine Valley Forest',
      locationName: 'Pine Valley Forest',
      latitude: 12.9248,
      longitude: 77.6200,
      address: 'Valley Perimeter Gate 3',
      severity: 'CRITICAL',
      riskScore: 0.94,
      status: 'REPORTED',
      reportedBy: 'Forest Ranger Station',
      createdAt: new Date(Date.now() - 7200000).toISOString()
    }
  ],
  resources: [
    {
      _id: 'res_1',
      resourceType: 'Medical Support',
      resourceName: 'Emergency Trauma Kit & Defibrillators',
      quantity: 120,
      availableQuantity: 85,
      location: 'Central Medical Depot',
      latitude: 12.9780,
      longitude: 77.5910,
      availability: 'AVAILABLE',
      status: 'READY'
    },
    {
      _id: 'res_2',
      resourceType: 'Rescue Vehicles',
      resourceName: 'Amphibious Evacuation Boats',
      quantity: 24,
      availableQuantity: 14,
      location: 'Riverfront Marina Base',
      latitude: 12.9690,
      longitude: 77.6020,
      availability: 'PARTIALLY_AVAILABLE',
      status: 'DEPLOYED'
    },
    {
      _id: 'res_3',
      resourceType: 'Emergency Shelter',
      resourceName: 'All-Weather Disaster Tents',
      quantity: 500,
      availableQuantity: 340,
      location: 'North Logistics Hub',
      latitude: 12.9950,
      longitude: 77.5600,
      availability: 'AVAILABLE',
      status: 'READY'
    },
    {
      _id: 'res_4',
      resourceType: 'Food & Clean Water',
      resourceName: 'Clean Drinking Water Packets (500L)',
      quantity: 2000,
      availableQuantity: 1450,
      location: 'South Regional Warehouse',
      latitude: 12.9200,
      longitude: 77.6150,
      availability: 'AVAILABLE',
      status: 'READY'
    }
  ],
  alerts: [
    {
      _id: 'alt_1',
      message: 'Flash Flood Warning: Evacuate lower elevations along Riverside immediately.',
      alertType: 'EVACUATION',
      location: 'Riverside District',
      priority: 'CRITICAL',
      active: true,
      actionRequired: 'Move to elevated emergency shelter at North Logistics Hub',
      broadcastedBy: 'Emergency Command Center',
      createdAt: new Date().toISOString()
    },
    {
      _id: 'alt_2',
      message: 'Air Quality Hazard due to Pine Valley Wildfire smoke plumes. Wear N95 masks.',
      alertType: 'HEALTH_ADVISORY',
      location: 'Pine Valley Perimeter',
      priority: 'HIGH',
      active: true,
      actionRequired: 'Stay indoors with windows sealed.',
      broadcastedBy: 'Health Emergency Taskforce',
      createdAt: new Date(Date.now() - 3600000).toISOString()
    }
  ],
  rescueTeams: [
    {
      _id: 'team_1',
      teamName: 'Alpha Swiftwater Rescue',
      teamLeader: 'Capt. Marcus Vance',
      currentLocation: 'Riverside Marina',
      latitude: 12.9716,
      longitude: 77.5946,
      status: 'DEPLOYED',
      membersCount: 10,
      specialization: 'Flood & Swiftwater Extraction',
      contact: '+1-800-ALPHA-911'
    },
    {
      _id: 'team_2',
      teamName: 'Bravo Urban Search & K9',
      teamLeader: 'Lt. Sarah Chen',
      currentLocation: 'Northridge Hills Base',
      latitude: 12.9902,
      longitude: 77.5521,
      status: 'STANDBY',
      membersCount: 12,
      specialization: 'Structural Collapse & K9 Tracking',
      contact: '+1-800-BRAVO-911'
    },
    {
      _id: 'team_3',
      teamName: 'Delta Wildfire Suppression',
      teamLeader: 'Chief Robert Torres',
      currentLocation: 'Pine Valley Forward Post',
      latitude: 12.9248,
      longitude: 77.6200,
      status: 'DEPLOYED',
      membersCount: 16,
      specialization: 'Wildfire Containment & Evac',
      contact: '+1-800-DELTA-911'
    }
  ],
  emergencyRoutes: [
    {
      _id: 'route_1',
      routeName: 'Evac Corridor Alpha (Riverside to North Hub)',
      startLocation: 'Riverside District',
      endLocation: 'North Logistics Hub',
      status: 'CLEAR',
      distanceKm: 8.4,
      estimatedMinutes: 18,
      safeForHeavyVehicles: true
    },
    {
      _id: 'route_2',
      routeName: 'Valley Expressway Route 7',
      startLocation: 'Pine Valley Forest',
      endLocation: 'South Regional Hospital',
      status: 'CONGESTED',
      distanceKm: 12.1,
      estimatedMinutes: 35,
      safeForHeavyVehicles: false
    }
  ],
  simulations: [
    {
      _id: 'sim_1',
      disasterId: 'rep_1',
      planName: 'Flood Response Strategy Delta',
      score: 92,
      responseTime: 14,
      status: 'APPROVED',
      scenarioDetails: {
        severity: 'HIGH',
        peopleAffected: 320,
        deployedTeams: 2,
        allocatedSupplies: '10 Evacuation Boats, 50 Trauma Kits'
      },
      recommendations: [
        'Dispatch Swiftwater Team Alpha immediately',
        'Establish mobile triage at North Logistics Hub',
        'Pre-position 500 emergency meal rations'
      ],
      createdAt: new Date().toISOString()
    }
  ],
  resourceAllocations: [
    {
      _id: 'alloc_1',
      disasterId: 'rep_1',
      resourceId: 'res_2',
      resourceName: 'Amphibious Evacuation Boats',
      quantity: 6,
      allocatedLocation: 'Riverside District',
      status: 'DISPATCHED',
      createdAt: new Date().toISOString()
    }
  ],
  feedback: [
    {
      _id: 'fb_1',
      userId: 'user_2',
      userName: 'Jane Citizen',
      rating: 5,
      feedbackText: 'The emergency alert was received in seconds and guided our neighborhood to safe high ground.',
      createdAt: new Date().toISOString()
    }
  ],
  notifications: [
    {
      _id: 'notif_1',
      recipient: 'All Citizens',
      message: 'Emergency warning: Flood level rising in Riverside. Shelter opened at North Hub.',
      notificationType: 'CRITICAL',
      status: 'UNREAD',
      createdAt: new Date().toISOString()
    }
  ]
};
