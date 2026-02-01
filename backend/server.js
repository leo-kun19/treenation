const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Serve images from root directory
const path = require('path');
app.use('/images', express.static(path.join(__dirname, '..')));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '..')));

// Database initialization
const db = require('./config/database');
db.initialize();

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/services', require('./routes/services'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Treen.nation API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'Treen.nation API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            products: '/api/products',
            orders: '/api/orders',
            cart: '/api/cart',
            contact: '/api/contact',
            services: '/api/services'
        }
    });
});

// API routes should be before catch-all
// Catch-all route for frontend (SPA routing)
app.get('*', (req, res) => {
    // If request is for API, return 404
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }
    // Otherwise serve index.html for frontend routing
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Error handling middleware
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
});

module.exports = app;
