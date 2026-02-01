const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath);

const initialize = () => {
    db.serialize(() => {
        // Products table
        db.run(`
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                price INTEGER NOT NULL,
                image_url TEXT,
                category TEXT,
                stock INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Orders table
        db.run(`
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                customer_name TEXT NOT NULL,
                customer_email TEXT NOT NULL,
                customer_phone TEXT,
                customer_address TEXT,
                total_amount INTEGER NOT NULL,
                status TEXT DEFAULT 'pending',
                notes TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Order items table
        db.run(`
            CREATE TABLE IF NOT EXISTS order_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                order_id INTEGER NOT NULL,
                product_id INTEGER NOT NULL,
                quantity INTEGER NOT NULL,
                price INTEGER NOT NULL,
                FOREIGN KEY (order_id) REFERENCES orders(id),
                FOREIGN KEY (product_id) REFERENCES products(id)
            )
        `);

        // Contact messages table
        db.run(`
            CREATE TABLE IF NOT EXISTS contact_messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                subject TEXT,
                message TEXT NOT NULL,
                status TEXT DEFAULT 'unread',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Cart table (session-based)
        db.run(`
            CREATE TABLE IF NOT EXISTS cart_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL,
                product_id INTEGER NOT NULL,
                quantity INTEGER NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (product_id) REFERENCES products(id)
            )
        `);

        // Insert sample products
        db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
            if (row.count === 0) {
                const sampleProducts = [
                    // Products with local images
                    ['Hibiscus Tank top', 'A light, flowy tank with a hibiscus print, made from recycled fabric.', 85000, 'Hibiscus Tank top.jpeg', 'clothing', 10],
                    ['Rock Guitar Tank Top', 'A white Y2K-inspired tank with a guitar graphic, crafted from recycled fabric.', 90000, 'Rock Guitar Tank Top.jpeg', 'clothing', 8],
                    ['Olive Martini Sweater', 'A navy sweater with a playful olive martini design, made from recycled felt.', 130000, 'Olive Martini Sweater.jpeg', 'clothing', 5],
                    ['Apple Button Crop Top', 'A brown crop top with a sweet apple design, made using recycled fabric and buttons.', 95000, 'Apple Button Crop Top.jpeg', 'clothing', 12],
                    ['Handmade Felt Keychain', 'Handmade keychains turning fabric scraps into everyday accessories.', 25000, 'Handmade Felt Keychain.jpeg', 'accessories', 50],
                    ['Felt Photocard Holder', 'A cozy felt frame to display your favorite photocard, made from recycled materials.', 35000, 'Felt Photocard Holder.jpeg', 'accessories', 30],
                    ['Handmade Star Keychain', 'A handmade star keychain crafted from recycled felt.', 15000, 'Handmade Star Keychain.jpeg', 'accessories', 40],
                    ['Handmade Felt Monster', 'A charming handmade felt monster decoration made from recycled materials.', 20000, 'Handmade Felt Monster.jpeg', 'accessories', 25],
                    ['Denim Stingray Purse', 'Unique stingray-shaped purse made from recycled denim.', 65000, 'Denim Stingray Purse.jpeg', 'bags', 8],
                    ['Denim Bow Purse', 'Adorable denim purse with a sweet bow detail, crafted from recycled materials.', 85000, 'Denim Bow Purse.jpeg', 'bags', 6],
                    
                    // Coming Soon products with local images
                    ['Jeans Ladybug Bag', 'Coming Soon - Unique ladybug-shaped bag made from recycled jeans.', 95000, 'Jeans Ladybug Bag.jpeg', 'bags', 0],
                    ['Daisy Quilted Bag', 'Coming Soon - Quilted bag with daisy pattern.', 95000, 'Daisy Quilted Bag.jpeg', 'bags', 0],
                    ['Floral Bag', 'Coming Soon - Beautiful floral patterned bag.', 100000, 'Floral Bag.jpeg', 'bags', 0],
                    ['Rustic Rope Bag', 'Coming Soon - Rustic style bag with rope details.', 85000, 'Rustic Rope Bag.jpeg', 'bags', 0],
                    ['Patchwork Handbag', 'Coming Soon - Colorful patchwork handbag.', 105000, 'Patchwork Handbag.jpeg', 'bags', 0],
                    ['Butterfly Tank Top', 'Coming Soon - Tank top with butterfly design.', 125000, 'Butterfly Tank Top.jpeg', 'clothing', 0],
                    ['Plaid Off-shoulder top', 'Coming Soon - Stylish plaid off-shoulder top.', 100000, 'Plaid Off-shoulder top.jpeg', 'clothing', 0]
                ];

                const stmt = db.prepare("INSERT INTO products (name, description, price, image_url, category, stock) VALUES (?, ?, ?, ?, ?, ?)");
                sampleProducts.forEach(product => {
                    stmt.run(product);
                });
                stmt.finalize();
                console.log('✅ Sample products inserted');
            }
        });
    });

    console.log('✅ Database initialized');
};

module.exports = { db, initialize };
