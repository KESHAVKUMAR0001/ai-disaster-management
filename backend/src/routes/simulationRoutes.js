import express from 'express';
import {
  runSimulation,
  getSimulation,
  approveSimulation,
  overrideSimulation,
  getAllSimulations
} from '../controllers/simulationController.js';

const router = express.Router();

router.post('/run', runSimulation);
router.post('/', runSimulation);
router.get('/', getAllSimulations);
router.get('/:simulationId', getSimulation);
router.post('/:simulationId/approve', approveSimulation);
router.post('/:simulationId/override', overrideSimulation);

export default router;
