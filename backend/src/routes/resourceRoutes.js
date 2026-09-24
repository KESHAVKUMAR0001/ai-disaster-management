import express from 'express';
import {
  getResources,
  addResource,
  getResourceRequirements,
  getResourceLocations,
  allocateResource
} from '../controllers/resourceController.js';

const router = express.Router();

router.get('/', getResources);
router.post('/', addResource);
router.get('/locations', getResourceLocations);
router.get('/requirements/:reportId', getResourceRequirements);
router.post('/allocate', allocateResource);

export default router;
