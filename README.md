# 🌿 Treen.nation - Sustainable Fashion E-commerce

Website e-commerce untuk brand fashion berkelanjutan yang mengubah limbah tekstil menjadi produk fashion berkualitas.

## 📋 Fitur

### Frontend
- ✅ **Responsive Design** - Mobile, tablet, dan desktop friendly
- ✅ **Product Catalog** - Tampilan produk dengan search & filter
- ✅ **Shopping Cart** - Keranjang belanja dengan session management
- ✅ **Order System** - Sistem pemesanan lengkap
- ✅ **Contact Form** - Form kontak untuk customer
- ✅ **Services Page** - Informasi layanan upcycling
- ✅ **About Page** - Tentang brand dan misi sustainability

### Backend API
- ✅ **Products Management** - CRUD produk
- ✅ **Orders Management** - Sistem pemesanan
- ✅ **Cart System** - Shopping cart dengan session
- ✅ **Contact Messages** - Pengelolaan pesan kontak
- ✅ **SQLite Database** - Database ringan dan portable

## 🚀 Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Google Fonts (Bitter, Young Serif)
- Responsive Grid & Flexbox

### Backend
- Node.js + Express.js
- SQLite3
- CORS, Body-parser
- RESTful API

## 📦 Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd treennation
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Setup Environment
```bash
# Copy .env file dan sesuaikan jika perlu
cp .env.example .env
```

### 4. Start Backend Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server akan berjalan di `http://localhost:3000`

### 5. Open Frontend
Buka file `index.html` di browser atau gunakan live server:
```bash
# Jika menggunakan VS Code Live Server
# Klik kanan index.html > Open with Live Server
```

## 📁 Project Structure

```
treennation/
├── backend/
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── routes/
│   │   ├── products.js          # Products API
│   │   ├── orders.js            # Orders API
│   │   ├── cart.js              # Cart API
│   │   ├── contact.js           # Contact API
│   │   └── services.js          # Services API
│   ├── .env                     # Environment variables
│   ├── .gitignore
│   ├── package.json
│   ├── server.js                # Main server file
│   └── README.md
├── js/
│   ├── api.js                   # API client
│   ├── shop.js                  # Shop page logic
│   ├── cart.js                  # Cart functionality
│   └── contact.js               # Contact form
├── index.html                   # Homepage
├── shop.html                    # Shop page
├── about.html                   # About page
├── services.html                # Services page
├── contact.html                 # Contact page
├── order.html                   # Order info page
├── styles.css                   # Main stylesheet
└── README.md                    # This file
```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart
- `GET /api/cart/:sessionId` - Get cart items
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:id` - Update quantity
- `DELETE /api/cart/:id` - Remove item
- `DELETE /api/cart/session/:sessionId` - Clear cart

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order details
- `POST /api/orders` - Create order
- `PATCH /api/orders/:id/status` - Update status

### Contact
- `GET /api/contact` - Get messages
- `POST /api/contact` - Submit message
- `PATCH /api/contact/:id/status` - Update status

### Services
- `GET /api/services` - Get all services

## 🎨 Design System

### Colors
- **Primary Green**: `#374433`
- **Light Green**: `#EAF7DA`
- **Cream**: `#F4F5EB`
- **Dark Green**: `#3E5445`

### Typography
- **Headings**: Young Serif
- **Body**: Bitter

### Breakpoints
- Desktop: 1400px+
- Laptop: 1024px - 1400px
- Tablet: 768px - 1024px
- Mobile: < 768px

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev  # Auto-reload dengan nodemon
```

### Testing API
```bash
# Health check
curl http://localhost:3000/api/health

# Get products
curl http://localhost:3000/api/products

# Search products
curl http://localhost:3000/api/products?search=tank
```

## 📝 Usage Examples

### Add Product to Cart (JavaScript)
```javascript
await CartAPI.add(productId, quantity);
```

### Create Order
```javascript
const orderData = {
    customer_name: "John Doe",
    customer_email: "john@example.com",
    customer_phone: "081234567890",
    customer_address: "Jl. Contoh No. 123",
    items: [
        { product_id: 1, quantity: 2, price: 85000 }
    ],
    notes: "Please pack carefully"
};

await OrdersAPI.create(orderData);
```

### Submit Contact Form
```javascript
await ContactAPI.submit({
    name: "Jane Doe",
    email: "jane@example.com",
    subject: "Custom Order",
    message: "I would like to order..."
});
```

## 🔒 Security Notes

- Change `JWT_SECRET` in `.env` for production
- Add authentication for admin endpoints
- Implement rate limiting for API
- Validate all user inputs
- Use HTTPS in production

## 🚀 Deployment

### Backend (Node.js)
- Deploy ke Heroku, Railway, atau VPS
- Set environment variables
- Use PostgreSQL untuk production (optional)

### Frontend
- Deploy ke Netlify, Vercel, atau GitHub Pages
- Update `API_BASE_URL` di `js/api.js`

## 📄 License

MIT License

## 👥 Contact

- Email: treennation@gmail.com
- Instagram: @treen.nation
- TikTok: @treen.nation

---

Made with 💚 for a sustainable future
