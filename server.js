const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT || 8080;

// Database connection
const client = require('./configs/database');

client.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Database connected successfully!');
    }
});

// Import and use routes
const userRoutes = require('./routes/user');
app.use('/user', userRoutes);

// Basic route
app.get('/', (req, res) => {
    res.status(200).send("It's on");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
