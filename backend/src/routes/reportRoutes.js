import express from 'express';
import { createReport, getReports, getReportById, updateReportStatus } from '../controllers/reportController.js';

const router = express.Router();

router.post('/', createReport);
router.get('/', getReports);
router.get('/:id', getReportById);
router.patch('/:id/status', updateReportStatus);

export default router;
