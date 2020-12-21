import express from 'express';

import { getVolunteerList, getVolunteer, createVolunteer, updateVolunteer, deleteVolunteer } from '../controllers/volunteerController.js';

const router = express.Router();

router.get('/', getVolunteerList);
router.post('/', createVolunteer);
router.get('/:id', getVolunteer);
router.patch('/:id', updateVolunteer);
router.delete('/:id', deleteVolunteer);

export default router;