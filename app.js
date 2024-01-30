const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const cardRoutes = require('./routes/cardRoutes');
const db = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create users table
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS cards (id STRING, owner INTEGER, FOREIGN KEY(owner) REFERENCES users(id), PRIMARY KEY(id, owner))');
});

// Routes
app.use('/auth', authRoutes);
app.use('/card', cardRoutes);

app.use('/', (req, res) => {
    res.status(200).json({ message: 'Hello world!' });
});

// Port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
