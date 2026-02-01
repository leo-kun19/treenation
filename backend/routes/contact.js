const express = require('express');
const router = express.Router();
const { db } = require('../config/database');

// Get all contact messages
router.get('/', (req, res) => {
    const { status } = req.query;
    
    let query = 'SELECT * FROM contact_messages WHERE 1=1';
    const params = [];

    if (status) {
        query += ' AND status = ?';
        params.push(status);
    }

    query += ' ORDER BY created_at DESC';

    db.all(query, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ messages: rows });
    });
});

// Get single message
router.get('/:id', (req, res) => {
    db.get('SELECT * FROM contact_messages WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.json({ message: row });
    });
});

// Submit contact form
router.post('/', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const query = `
        INSERT INTO contact_messages (name, email, subject, message)
        VALUES (?, ?, ?, ?)
    `;

    db.run(query, [name, email, subject, message], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ 
            message: 'Message sent successfully',
            message_id: this.lastID 
        });
    });
});

// Update message status
router.patch('/:id/status', (req, res) => {
    const { status } = req.body;
    const validStatuses = ['unread', 'read', 'replied'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    db.run('UPDATE contact_messages SET status = ? WHERE id = ?', 
        [status, req.params.id], 
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Message not found' });
            }
            res.json({ message: 'Status updated successfully' });
        }
    );
});

// Delete message
router.delete('/:id', (req, res) => {
    db.run('DELETE FROM contact_messages WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.json({ message: 'Message deleted successfully' });
    });
});

module.exports = router;
