import express from 'express';
import { getTeams, createTeam, updateTeamStatus } from '../controllers/rescueTeamController.js';

const router = express.Router();

router.get('/', getTeams);
router.post('/', createTeam);
router.patch('/:id', updateTeamStatus);

export default router;
