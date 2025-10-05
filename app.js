require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const userRouter = require('./api/users/user.router');

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Serve static files (images, etc.)
app.use('/api/public', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/users', userRouter);

// Health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
