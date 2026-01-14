require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ================= MongoDB =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB - Project Service"))
  .catch((err) => console.error(err));

// ================= Schemas =================

// Publication Schema
const publicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  abstract: String,
  journal: String,
  year: Number,
});

// Project Schema
const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    researchers: [{ type: String, required: true }],
    startDate: { type: Date },
    endDate: { type: Date },
    publications: [publicationSchema],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

// ================= Routes =================

// Create Project + Publications
app.post("/projects", async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Projects
app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Project
app.delete("/projects/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= Server =================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Project Service running on port ${PORT}`)
);
