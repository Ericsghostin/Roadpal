const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB! ✅'))
  .catch((err) => console.log('Connection failed ❌', err));

// Schemas
const helpRequestSchema = new mongoose.Schema({
  name: String,
  phone: String,
  location: String,
  problem: String,
  date: { type: Date, default: Date.now }
});

const mechanicSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  area: String,
  date: { type: Date, default: Date.now }
});

const HelpRequest = mongoose.model('HelpRequest', helpRequestSchema);
const Mechanic = mongoose.model('Mechanic', mechanicSchema);

// Routes
app.get('/', (req, res) => {
  res.send('RoadPal server is running! 🔧');
});

app.post('/request-help', async (req, res) => {
  const request = new HelpRequest(req.body);
  await request.save();
  res.json({ message: 'Request received! A mechanic will contact you shortly.' });
});

app.post('/register-mechanic', async (req, res) => {
  const mechanic = new Mechanic(req.body);
  await mechanic.save();
  res.json({ message: 'Registration received! We will review and contact you.' });
});

app.listen(PORT, () => {
  console.log(`RoadPal server running on http://localhost:${PORT}`);
});