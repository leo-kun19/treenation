const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Database initialization
const db = require('./config/database');
db.initialize();

// ============ API ROUTES FIRST ============
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/services', require('./routes/services'));

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Treen.nation API is running' });
});

// ============ STATIC FILES (from parent folder) ============
app.use(express.static(path.join(__dirname, '..')));
app.use('/images', express.static(path.join(__dirname, '..')));

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌿 Treen.nation API running on http://0.0.0.0:${PORT}`);
    console.log(`📁 Serving static files from: ${path.join(__dirname, '..')}`);
});

module.exports = app;
