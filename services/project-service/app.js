const express = require('express');
const cors = require('cors');
const projectRoutes = require('./routes/project.routes');

const app = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== Routes =====
app.use('/projects', projectRoutes);

// ===== Export app =====
module.exports = app;
