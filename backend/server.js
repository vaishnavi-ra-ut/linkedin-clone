const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();
app.use(express.json());

// CORS: allow frontend origin(s)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, ()=> console.log('Server running on', PORT));
  console.log('📦 Active Database:', mongoose.connection.name);
}).catch(err => console.error(err));
