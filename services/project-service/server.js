require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB - Project Service'))
    .catch(err => console.error('MongoDB connection error:', err));

// Mongoose schema
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    researchers: [{ type: String }], // IDs of researchers
    startDate: { type: Date },
    endDate: { type: Date }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

// Routes

// Create Project
app.post('/projects', async (req, res) => {
    const { title, description, researchers, startDate, endDate } = req.body;
    try {
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

// GET projects count
app.get("/projects/count", async (req, res) => {
  try {
    const count = await Project.countDocuments();
    res.json({ totalProjects: count });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE project by id
app.delete('/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Project.findByIdAndDelete(id); // حذف المشروع من MongoDB
    if (!deleted) return res.status(404).json({ message: "Project not found" });

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete project" });
  }
});


// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Project Service running on port ${PORT}`));
