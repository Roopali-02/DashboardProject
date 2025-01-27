const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

//import routes
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
app.use(express.json())
app.use(cors());

app.use('/api/auth/', authRoutes);
app.use('/api/', authRoutes);
app.use('/api/delete-user/', authRoutes);
app.use('/api/user/', authRoutes);
app.use('/api/edit-user/', authRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB Connected!')).catch((err) => console.log('MongoDB Connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));