require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
//cors this is used to allow the frontend to access the backend
const cors = require('cors');
console.log("MONGO_URI on server:", process.env.MONGO_URI); // DEBUG

//i am checking that everything is working



connectDB();

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
    })
);
// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Hello World!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
