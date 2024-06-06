const express = require('express');
const mongoose = require('mongoose');
const config = require('./backend/config/config.js');
const userRoutes = require('./backend/routes/routes.js');

const app = express();

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const password = encodeURIComponent('1001ritik');
const dbUri = `mongodb+srv://ritikSh:${password}@cluster0.kay1hct.mongodb.net/EmployeeTask?retryWrites=true&w=majority&ssl=true`;

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tlsAllowInvalidCertificates: false, // Ensure to set this based on your certificate validity
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Routes
app.use('/api/v1', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
