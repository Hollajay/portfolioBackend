const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const cors = require('cors');
const messageRoute = require('./Routes/messageRoutes');

const App = express();


App.use(express.urlencoded({ extended: false }));
App.use(express.json());

// CORS configuration
App.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Routes
App.get('/', (req, res) => {
  res.send('Server home page !!');
});

App.use('/', messageRoute);

// Error handling middleware
App.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Database connection and server startup
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    App.listen(PORT, () => {
      console.log(`App now listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Database connection error:', err.message);
  });
