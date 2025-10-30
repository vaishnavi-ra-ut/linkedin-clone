const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();
app.use(express.json());

// ✅ Allow frontend origin (update after deploying frontend)
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;

// ✅ Connect DB and listen on all interfaces
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(err => console.error(err));
