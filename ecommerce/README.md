# 🛍️ LuxeShop — Full-Stack E-Commerce App

A complete e-commerce web application built with **React**, **Node.js/Express**, and **MongoDB Atlas**.

---

## 📁 Project Structure

```
ecommerce/
├── backend/          # Node.js + Express API
│   ├── models/       # Mongoose schemas (User, Product, Order)
│   ├── routes/       # Auth, Products, Orders, Cart
│   ├── middleware/   # JWT auth middleware
│   ├── server.js     # Entry point
│   ├── seed.js       # Sample data seeder
│   └── .env.example  # Environment variable template
└── frontend/         # React app
    └── src/
        ├── components/  # Navbar, Footer, ProductCard
        ├── context/     # AuthContext, CartContext
        ├── pages/       # Home, Products, Cart, Checkout, Orders, Admin
        └── utils/       # Axios API calls
```

---

## 🚀 Quick Start

### 1. Set Up MongoDB Atlas

1. Go to [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas) and create a free account
2. Create a new cluster (free tier is fine)
3. Create a database user under **Security → Database Access**
4. Whitelist your IP under **Security → Network Access** (or use `0.0.0.0/0` for development)
5. Get your connection string from **Deployment → Database → Connect → Drivers**

### 2. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env — add your MongoDB Atlas URI and a JWT secret
npm install
npm run dev         # Starts on http://localhost:5000
```

### 3. Seed Sample Data (optional but recommended)

```bash
cd backend
node seed.js        # Inserts 12 sample products
```

### 4. Frontend Setup

```bash
cd frontend
npm install
npm start           # Opens http://localhost:3000
```

---

## 🔧 Environment Variables (backend/.env)

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Random secret string for JWT signing |
| `PORT` | Server port (default: 5000) |
| `CLIENT_URL` | Frontend URL for CORS (default: http://localhost:3000) |

---

## ✨ Features

### Customer
- 🏠 **Homepage** — Hero banner, category grid, featured products
- 🛍️ **Shop** — Browse products with search, category filter, sort, pagination
- 📦 **Product Detail** — Images, description, stock, quantity selector
- 🛒 **Cart** — Add/remove/update quantities, free shipping calculation
- ✅ **Checkout** — Shipping address + payment method (COD/Card/UPI)
- 📋 **Orders** — View order history with status tracking
- 🔐 **Auth** — Register, Login (JWT-based)

### Admin (role: "admin")
- ➕ **Add products** — Name, category, price, stock, image, featured flag
- 🗑️ **Delete products**
- 📊 **Order management** — Update order status & payment status

---

## 🔑 Making an Admin User

After registering a user, update their role in MongoDB Atlas:
```javascript
// In MongoDB Atlas Data Explorer or compass
db.users.updateOne({ email: "you@example.com" }, { $set: { role: "admin" } })
```

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Auth |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Protected |
| PUT | `/api/auth/profile` | Protected |

### Products
| Method | Endpoint | Auth |
|---|---|---|
| GET | `/api/products?search=&category=&sort=&page=` | Public |
| GET | `/api/products/featured` | Public |
| GET | `/api/products/:id` | Public |
| POST | `/api/products` | Admin |
| PUT | `/api/products/:id` | Admin |
| DELETE | `/api/products/:id` | Admin |

### Orders
| Method | Endpoint | Auth |
|---|---|---|
| POST | `/api/orders` | Protected |
| GET | `/api/orders/my` | Protected |
| GET | `/api/orders/:id` | Protected |
| GET | `/api/orders` | Admin |
| PUT | `/api/orders/:id/status` | Admin |

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Axios, React Toastify |
| Backend | Node.js, Express 4 |
| Database | MongoDB Atlas (Mongoose ODM) |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Styling | Pure CSS with CSS variables (dark theme) |

---

## 📦 Deployment Tips

**Backend (Railway / Render / Heroku):**
- Set all env vars in the dashboard
- Make sure `CLIENT_URL` points to your deployed frontend URL

**Frontend (Vercel / Netlify):**
- Set `REACT_APP_API_URL` if not using the proxy
- Update the `proxy` in `package.json` or the axios base URL for production
