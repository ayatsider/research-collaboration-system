const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const researcherRoutes = require('./routes/researcher');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/researchers', researcherRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
