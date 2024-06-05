const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./backend/routes/routes.js');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


mongoose.connect('mongodb://localhost:27017/employeetask');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api/v1',userRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});