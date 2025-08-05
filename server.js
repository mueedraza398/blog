const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
//cors
const cors = require('cors');




dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: FRONTEND_URL || 'http://localhost:3000', // Use the environment variable or default to localhost
        credentials: true,
    }
));
// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Hello World!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
