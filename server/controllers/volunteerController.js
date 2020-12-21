import express from 'express';
import mongoose from 'mongoose';

import VolunteerModel from '../models/volunteerModel.js';

const router = express.Router();

export const getVolunteerList = async (req, res) => { 
    try {
        const volunteerList = await VolunteerModel.find();
                
        res.status(200).json(volunteerList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getVolunteer = async (req, res) => { 
    const { id } = req.params;

    try {
        const volunteer = await VolunteerModel.findById(id);
        
        res.status(200).json(volunteer);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createVolunteer = async (req, res) => {
    const { name, email, phone } = req.body;

    const newVolunteer = new VolunteerModel({ name, email, phone })

    try {
        await newVolunteer.save();

        res.status(201).json(newVolunteer );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateVolunteer = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No volunteer with id: ${id}`);

    const updatedVolunteer = { name, email, phone, _id: id };

    await VolunteerModel.findByIdAndUpdate(id, updatedVolunteer, { new: true });

    res.json(updatedVolunteer);
}

export const deleteVolunteer = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No volunteer with id: ${id}`);

    await VolunteerModel.findByIdAndRemove(id);

    res.json({ message: "Volunteer deleted successfully." });
}

export default router;