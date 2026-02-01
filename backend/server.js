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

// Serve frontend static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '..'), {
    index: false // Don't auto-serve index.html, we'll handle it manually
}));

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

// Catch-all route for frontend (SPA routing)
app.get('*', (req, res) => {
    // If request is for API, return 404
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }
    // Otherwise serve index.html for frontend routing
    const indexPath = path.join(__dirname, '..', 'index.html');
    console.log('Serving index.html from:', indexPath);
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Error serving index.html:', err);
            res.status(500).json({ error: 'Could not load frontend', path: indexPath });
        }
    });
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
