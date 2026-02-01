# Treen.nation Backend API

Backend API untuk website e-commerce sustainable fashion Treen.nation.

## 🚀 Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite3** - Database
- **CORS** - Cross-origin resource sharing
- **Body-parser** - Request body parsing

## 📦 Installation

```bash
cd backend
npm install
```

## 🏃 Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

## 📚 API Endpoints

### Products

- `GET /api/products` - Get all products
  - Query params: `?category=clothing&search=tank`
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders

- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order with items
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status

### Cart

- `GET /api/cart/:sessionId` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart/session/:sessionId` - Clear cart

### Contact

- `GET /api/contact` - Get all messages
  - Query params: `?status=unread`
- `GET /api/contact/:id` - Get single message
- `POST /api/contact` - Submit contact form
- `PATCH /api/contact/:id/status` - Update message status
- `DELETE /api/contact/:id` - Delete message

### Services

- `GET /api/services` - Get all services

### Health Check

- `GET /api/health` - Check API status

## 📝 Example Requests

### Create Order
```json
POST /api/orders
{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "customer_phone": "081234567890",
  "customer_address": "Jl. Contoh No. 123, Jakarta",
  "items": [
    {
      "product_id": 1,
      "quantity": 2,
      "price": 85000
    }
  ],
  "notes": "Please pack carefully"
}
```

### Add to Cart
```json
POST /api/cart
{
  "session_id": "user-session-123",
  "product_id": 1,
  "quantity": 1
}
```

### Submit Contact Form
```json
POST /api/contact
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Custom Order Inquiry",
  "message": "I would like to order a custom upcycled jacket..."
}
```

## 🗄️ Database Schema

### Products
- id, name, description, price, image_url, category, stock, created_at, updated_at

### Orders
- id, customer_name, customer_email, customer_phone, customer_address, total_amount, status, notes, created_at, updated_at

### Order Items
- id, order_id, product_id, quantity, price

### Contact Messages
- id, name, email, subject, message, status, created_at

### Cart Items
- id, session_id, product_id, quantity, created_at

## 🔒 Environment Variables

Create `.env` file:
```
PORT=3000
JWT_SECRET=your_secret_key
NODE_ENV=development
```

## 📄 License

MIT
