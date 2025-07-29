require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());
// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../build')));
// Email sending
const { sendContactMail } = require('./email');

// Contact form endpoint (must be after app and middleware setup)
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  try {
    await sendContactMail({ name, email, message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

// Connect to MongoDB and start server only after successful connection
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  image: String,
});

const Project = mongoose.model('Project', projectSchema);

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/projects', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// Update POST route to handle file uploads
app.post('/api/projects', upload.fields([
  { name: 'media', maxCount: 1 }
]), async (req, res) => {
  const { title, description, link } = req.body;
  let mediaUrl = '';
  if (req.files && req.files.media && req.files.media[0]) {
    mediaUrl = `/uploads/${req.files.media[0].filename}`;
  }
  const project = new Project({
    title,
    description,
    link,
    image: mediaUrl // can be image or video
  });
  await project.save();
  res.status(201).json(project);
});

// Serve React frontend for all other routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});
// ...existing code...