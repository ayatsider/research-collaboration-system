const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// Create project
router.post('/', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all projects
router.get('/', async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

// Get project by ID
router.get('/:id', async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
});

// Update project
router.put('/:id', async (req, res) => {
    const project = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(project);
});

// Delete project
router.delete('/:id', async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
});

module.exports = router;
