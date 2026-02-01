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

// Database initialization
const db = require('./config/database');
db.initialize();

// ============ API ROUTES ONLY ============
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/services', require('./routes/services'));

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Treen.nation API is running' });
});

// ============ STATIC FILES ============
// Serve images
app.use('/images', express.static(path.join(__dirname, '..')));

// Serve JS files
app.get('/js/:file', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'js', req.params.file));
});

// Serve CSS
app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'styles.css'));
});

// Serve HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/shop.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'shop.html'));
});

app.get('/services.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'services.html'));
});

app.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'about.html'));
});

app.get('/contact.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'contact.html'));
});

app.get('/cart.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'cart.html'));
});

app.get('/order.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'order.html'));
});

// Serve PNG/JPEG files from root
app.get('/:file', (req, res, next) => {
    const file = req.params.file;
    if (file.match(/\.(png|jpg|jpeg|gif|svg)$/i)) {
        res.sendFile(path.join(__dirname, '..', file));
    } else {
        next();
    }
});

// 404 for everything else
app.use((req, res) => {
    res.status(404).json({ error: 'Not found', path: req.path });
});

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
});

module.exports = app;
