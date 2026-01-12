// ====== Setup & Imports ======
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
app.use(cors());


const app = express();
app.use(express.json());

// ====== MongoDB Connection ======
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB - Project Service'))
    .catch(err => console.error('MongoDB connection error:', err));

// ====== Mongoose Schema ======
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    researchers: [{ type: String }], // IDs of researchers
    startDate: { type: Date },
    endDate: { type: Date }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

// ====== Routes ======

// Create Project
app.post('/projects', async (req, res) => {
    try {
        const { title, description, researchers, startDate, endDate } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        const newProject = await Project.create({ title, description, researchers, startDate, endDate });
        res.status(201).json({ message: 'Project created successfully', project: newProject });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// GET all projects
app.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// GET project by ID
app.get('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Update project by ID
app.put('/projects/:id', async (req, res) => {
    try {
        const { title, description, researchers, startDate, endDate } = req.body;
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        if (title) project.title = title;
        if (description) project.description = description;
        if (researchers) project.researchers = researchers;
        if (startDate) project.startDate = startDate;
        if (endDate) project.endDate = endDate;

        await project.save();
        res.json({ message: 'Project updated successfully', project });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Delete project by ID
app.delete('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// ====== Start Server ======
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Project Service running on port ${PORT}`));
