const express = require('express');
const router = express.Router();
const { db } = require('../config/database');

// Get cart items
router.get('/:sessionId', (req, res) => {
    const query = `
        SELECT c.*, p.name, p.price, p.image_url, p.stock
        FROM cart_items c
        JOIN products p ON c.product_id = p.id
        WHERE c.session_id = ?
    `;

    db.all(query, [req.params.sessionId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const total = rows.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        res.json({ cart_items: rows, total });
    });
});

// Add to cart
router.post('/', (req, res) => {
    const { session_id, product_id, quantity } = req.body;

    if (!session_id || !product_id || !quantity) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if item already in cart
    db.get('SELECT * FROM cart_items WHERE session_id = ? AND product_id = ?', 
        [session_id, product_id], 
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (row) {
                // Update quantity
                db.run('UPDATE cart_items SET quantity = quantity + ? WHERE id = ?', 
                    [quantity, row.id], 
                    function(err) {
                        if (err) {
                            return res.status(500).json({ error: err.message });
                        }
                        res.json({ message: 'Cart updated successfully' });
                    }
                );
            } else {
                // Insert new item
                db.run('INSERT INTO cart_items (session_id, product_id, quantity) VALUES (?, ?, ?)', 
                    [session_id, product_id, quantity], 
                    function(err) {
                        if (err) {
                            return res.status(500).json({ error: err.message });
                        }
                        res.status(201).json({ 
                            message: 'Item added to cart',
                            cart_item_id: this.lastID 
                        });
                    }
                );
            }
        }
    );
});

// Update cart item quantity
router.put('/:id', (req, res) => {
    const { quantity } = req.body;

    if (quantity < 1) {
        return res.status(400).json({ error: 'Quantity must be at least 1' });
    }

    db.run('UPDATE cart_items SET quantity = ? WHERE id = ?', 
        [quantity, req.params.id], 
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Cart item not found' });
            }
            res.json({ message: 'Cart item updated successfully' });
        }
    );
});

// Remove from cart
router.delete('/:id', (req, res) => {
    db.run('DELETE FROM cart_items WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Cart item not found' });
        }
        res.json({ message: 'Item removed from cart' });
    });
});

// Clear cart
router.delete('/session/:sessionId', (req, res) => {
    db.run('DELETE FROM cart_items WHERE session_id = ?', [req.params.sessionId], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Cart cleared successfully' });
    });
});

module.exports = router;
