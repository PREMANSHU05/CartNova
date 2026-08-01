# 🛒 CartNova - MERN E-Commerce Platform

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Express](https://img.shields.io/badge/API-Express-black)
![Razorpay](https://img.shields.io/badge/Payment-Razorpay-blue)
## 📌 Project Description

CartNova is a full-stack e-commerce application built using the **MERN stack**.

It provides a complete online shopping experience with secure user authentication, product management, shopping cart, wishlist, order management, and online payment integration using Razorpay.

---

# 🚀 Tech Stack

## Frontend

* React.js
* Vite
* React Router DOM
* Axios
* Framer Motion
* Lucide React
* React Hot Toast

## Backend

* Node.js
* Express.js
* JWT Authentication
* REST API
* Middleware Architecture

## Database

* MongoDB
* MongoDB Atlas

## Services

* Cloudinary (Image Upload)
* Razorpay (Payment Gateway)

---

# ✨ Features

## 👤 User Features

* User Registration and Login
* JWT Authentication
* Browse Products
* Search Products
* Filter Products by Category
* Sort Products by Price
* Product Details Page
* Recently Viewed Products
* Add Products to Cart
* Wishlist Management
* Checkout System
* Razorpay Payment Integration
* Order History
* User Profile Management

---

## 🔐 Admin Features

* Admin Authentication
* Add Products
* Update Products
* Delete Products
* Manage Products
* Manage Product Status
* View All Products
* Manage Orders

---

# 📂 Project Structure

```
CartNova
│
├── frontend
│   │
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── styles
│   │   └── api
│   │
│   └── package.json
│
└── backend
    │
    ├── controllers
    ├── models
    ├── routes
    ├── middleware
    ├── config
    └── server.js
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/PREMANSHU05/CartNova
```

Go inside the project:

```bash
cd CartNova
```

---

# 🔥 Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRE=7d

RAZORPAY_KEY_ID=your_key

RAZORPAY_KEY_SECRET=your_secret

CLOUDINARY_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_secret
```

Run backend:

```bash
npm run dev
```

---

# ⚛️ Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run React application:

```bash
npm run dev
```

---

# 🔌 API Endpoints

## Authentication

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/api/auth/register` |
| POST   | `/api/auth/login`    |

---

## Products

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | `/api/products`     |
| GET    | `/api/products/:id` |
| POST   | `/api/products`     |
| PUT    | `/api/products/:id` |
| DELETE | `/api/products/:id` |

---

## Cart

| Method | Endpoint                      |
| ------ | ----------------------------- |
| GET    | `/api/cart`                   |
| POST   | `/api/cart/add`               |
| DELETE | `/api/cart/remove/:productId` |

---

## Wishlist

| Method | Endpoint                          |
| ------ | --------------------------------- |
| GET    | `/api/wishlist`                   |
| POST   | `/api/wishlist/add/:productId`    |
| DELETE | `/api/wishlist/remove/:productId` |

---

## Orders

| Method | Endpoint      |
| ------ | ------------- |
| POST   | `/api/orders` |
| GET    | `/api/orders` |

---

## Payment

| Method | Endpoint              |
| ------ | --------------------- |
| POST   | `/api/payment/create` |
| POST   | `/api/payment/verify` |

---

# 💳 Payment Flow

Cartify uses Razorpay Test Mode for payment processing.

```
User Checkout
       |
       ↓
Create Order
       |
       ↓
Create Razorpay Payment
       |
       ↓
Verify Payment
       |
       ↓
Order Confirmation
```

---



# 🔮 Future Improvements

* AI Shopping Assistant
* Product Recommendation System
* Email Notifications
* Advanced Analytics Dashboard
* Mobile Application

---

# 👨‍💻 Author

**Premanshu Padwal**

---

⭐ If you like this project, consider giving it a star!
