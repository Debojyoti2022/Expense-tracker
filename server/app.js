const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');
require('dotenv').config();

const app = express();

// Connect to database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/expenses', expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
