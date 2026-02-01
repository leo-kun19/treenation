const express = require('express');
const router = express.Router();

// Get all services
router.get('/', (req, res) => {
    const services = [
        {
            id: 1,
            title: 'Upcycling Service, Send Us Your Clothes!',
            description: 'Turn your old clothing into something completely new. Choose a style, send us your pieces, and we\'ll redesign them into custom, sustainable fashion made just for you.',
            icon: '♻️'
        },
        {
            id: 2,
            title: 'Ready-Made Upcycled Clothing',
            description: 'Shop our handmade clothing collections created entirely from recycled fabrics. Every piece is unique and produced in small batches to minimize waste.',
            icon: '👕'
        },
        {
            id: 3,
            title: 'Repair and Recycle',
            description: 'Extend the life of your favorite garments. We offer resizing, patching, fixing tears, and refreshing old clothes to make them wearable again.',
            icon: '🧵'
        },
        {
            id: 4,
            title: 'Fabric Donating Program',
            description: 'Donate clothing or fabric scraps you no longer need. We will upcycle them into future collections and reduce textile waste.',
            icon: '🎁'
        }
    ];

    res.json({ services });
});

module.exports = router;
