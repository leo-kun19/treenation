const express = require('express');
const router = express.Router();
const { db } = require('../config/database');

// Get all orders
router.get('/', (req, res) => {
    const query = `
        SELECT o.*, 
               GROUP_CONCAT(oi.product_id || ':' || oi.quantity || ':' || oi.price) as items
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        GROUP BY o.id
        ORDER BY o.created_at DESC
    `;

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ orders: rows });
    });
});

// Get single order
router.get('/:id', (req, res) => {
    const orderQuery = 'SELECT * FROM orders WHERE id = ?';
    const itemsQuery = `
        SELECT oi.*, p.name as product_name, p.image_url
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
    `;

    db.get(orderQuery, [req.params.id], (err, order) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        db.all(itemsQuery, [req.params.id], (err, items) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ order: { ...order, items } });
        });
    });
});

// Create order
router.post('/', (req, res) => {
    const { customer_name, customer_email, customer_phone, customer_address, items, notes } = req.body;

    if (!customer_name || !customer_email || !items || items.length === 0) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Calculate total
    let total_amount = 0;
    items.forEach(item => {
        total_amount += item.price * item.quantity;
    });

    // Insert order
    const orderQuery = `
        INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, total_amount, notes)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(orderQuery, [customer_name, customer_email, customer_phone, customer_address, total_amount, notes], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const orderId = this.lastID;

        // Insert order items
        const itemQuery = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';
        const stmt = db.prepare(itemQuery);

        items.forEach(item => {
            stmt.run([orderId, item.product_id, item.quantity, item.price]);
        });

        stmt.finalize((err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ 
                message: 'Order created successfully',
                order_id: orderId,
                total_amount 
            });
        });
    });
});

// Update order status
router.patch('/:id/status', (req, res) => {
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    db.run('UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', 
        [status, req.params.id], 
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.json({ message: 'Order status updated successfully' });
        }
    );
});

module.exports = router;
