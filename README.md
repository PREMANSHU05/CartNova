# 🛒 Cartify - MERN E-Commerce Platform
# Project Description
Cartify is a full-stack e-commerce application built using the MERN stack.
It provides a complete online shopping experience with user authentication,
product management, cart, wishlist, order management, and Razorpay payment integration.

## 🚀 Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- Framer Motion
- Lucide React
- React Hot Toast

### Backend
- Node.js
- Express.js
- JWT Authentication
- REST API

### Database
- MongoDB
- MongoDB Atlas

### Services
- Cloudinary (Image Upload)
- Razorpay (Payment Gateway)

- ## ✨ Features

### User Features

- User Registration/Login
- JWT Authentication
- Product Browsing
- Search Products
- Filter Products
- Sort Products
- Product Details
- Recently Viewed Products
- Shopping Cart
- Wishlist
- Checkout
- Razorpay Payment
- Order History


### Admin Features
- Admin Authentication
- Add Products
- Update Products
- Delete Products
- Manage Products
- Manage Orders

## 📂 Project Structure

Cartify

  Cartify
│
├── frontend
│ ├── src
│ │ ├── components
│ │ ├── pages
│ │ ├── styles
│ │ └── api
│
└── backend
├── controllers
├── models
├── routes
├── middleware
└── server.js

## ⚙️ Installation

Clone the repository:

```bash
git clone your-repository-link
---
# Backend Setup
```md
## Backend
```bash
cd backend
npm install

---

# Frontend Setup
```md
## Frontend
```bash
cd frontend
npm install
npm run dev

---

## Add API Details
```md

## 🔌 API Endpoints
### Authentication
POST `/api/auth/register`
POST `/api/auth/login`

### Products
GET `/api/products`
GET `/api/products/:id`

### Cart
GET `/api/cart`
POST `/api/cart/add`

### Wishlist
GET `/api/wishlist`
POST `/api/wishlist/add/:productId`

### Orders
POST `/api/orders`
GET `/api/orders`

## 📸 Screenshots
Coming Soon...
