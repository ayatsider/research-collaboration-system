const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Routes
const researcherRoutes = require('./routes/researcher');
const researcherProjectRoutes = require('./routes/resercher-project');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route endpoints
app.use('/researchers', researcherRoutes);
app.use('/relations/researcher-project', researcherProjectRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
