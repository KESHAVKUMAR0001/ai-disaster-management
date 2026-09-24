import express from 'express';
import { predictSeverity } from '../controllers/predictionController.js';
import { predictAIResources } from '../controllers/resourceController.js';

const router = express.Router();

router.post('/', predictSeverity);
router.post('/resources', predictAIResources);

export default router;
