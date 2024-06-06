const express = require('express');
const mongoose = require('mongoose');
const app = express();
const   config= require('./backend/config/config.js');
const userRoutes = require('./backend/routes/routes.js');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


// const password = encodeURIComponent('1001ritik');
mongoose.connect(`mongodb+srv://ritikSh:1001ritik@cluster0.kay1hct.mongodb.net/EmployeeTask?retryWrites=true&w=majority&appName=Cluster0`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api/v1',userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = config.port   || 3000 ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
