const express = require('express');
const router = express.Router();
const { db } = require('../config/database');

// Get all products
router.get('/', (req, res) => {
    const { category, search } = req.query;
    
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (category) {
        query += ' AND category = ?';
        params.push(category);
    }

    if (search) {
        query += ' AND (name LIKE ? OR description LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY created_at DESC';

    db.all(query, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ products: rows });
    });
});

// Get single product
router.get('/:id', (req, res) => {
    db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ product: row });
    });
});

// Create product (admin)
router.post('/', (req, res) => {
    const { name, description, price, image_url, category, stock } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: 'Name and price are required' });
    }

    const query = `
        INSERT INTO products (name, description, price, image_url, category, stock)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(query, [name, description, price, image_url, category, stock || 0], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Product created successfully',
            product_id: this.lastID 
        });
    });
});

// Update product (admin)
router.put('/:id', (req, res) => {
    const { name, description, price, image_url, category, stock } = req.body;

    const query = `
        UPDATE products 
        SET name = ?, description = ?, price = ?, image_url = ?, category = ?, stock = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;

    db.run(query, [name, description, price, image_url, category, stock, req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product updated successfully' });
    });
});

// Delete product (admin)
router.delete('/:id', (req, res) => {
    db.run('DELETE FROM products WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    });
});

module.exports = router;
