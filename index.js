require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const phoneRoutes = require('./routes/phoneRoutes'); 
const companyRoutes = require('./routes/companyRoutes');

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());

app.use('/phones', phoneRoutes);
app.use('/companies', companyRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
