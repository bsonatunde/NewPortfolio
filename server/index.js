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

// Ensure uploads directory exists
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up multer for file uploads with better configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename with timestamp and random string to avoid conflicts
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    const fileName = file.fieldname + '-' + uniqueSuffix + fileExtension;
    cb(null, fileName);
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow images and videos
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed!'), false);
    }
  }
});

// Serve uploaded files statically with proper cache headers
app.use('/uploads', express.static(uploadsDir, {
  maxAge: '1d', // Cache for 1 day
  etag: false
}));

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Update POST route to handle file uploads
app.post('/api/projects', upload.fields([
  { name: 'media', maxCount: 1 }
]), async (req, res) => {
  try {
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
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Delete project route
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Delete the associated file if it exists
    if (project.image && project.image.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, project.image);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
          console.log('Deleted file:', filePath);
        } catch (fileError) {
          console.error('Error deleting file:', fileError);
        }
      }
    }
    
    await Project.findByIdAndDelete(id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Serve React frontend for all other routes (must be last)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});