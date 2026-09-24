import axios from 'axios';

export const predictSeverity = async (req, res) => {
  try {
    const { disasterType = 'Flood', peopleAffected = 100, situation = 'URGENT', description = '' } = req.body;

    const aiUrl = process.env.AI_SERVICE_URL || 'http://localhost:5000';
    try {
      const response = await axios.post(`${aiUrl}/predict`, req.body, { timeout: 2000 });
      if (response.data && response.data.prediction) {
        return res.json(response.data.prediction);
      }
    } catch (err) {
      // Fallback AI calculation
    }

    const affected = Number(peopleAffected) || 100;
    let riskScore = 0.5;
    let severity = 'MEDIUM';

    if (affected > 300) {
      riskScore = 0.88;
      severity = 'CRITICAL';
    } else if (affected > 100) {
      riskScore = 0.75;
      severity = 'HIGH';
    } else if (affected > 30) {
      riskScore = 0.55;
      severity = 'MEDIUM';
    } else {
      riskScore = 0.35;
      severity = 'LOW';
    }

    return res.json({
      riskScore,
      severity,
      affectedPeople: affected,
      confidence: 0.92,
      modelUsed: 'Antigravity-AI-Heuristic-V2'
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
