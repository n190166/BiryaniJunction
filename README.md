# 🍚 Biryani Junction

A full-stack restaurant ordering system built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- 👤 User Authentication
- 🛒 Shopping Cart
- 📦 Order Management
- 🌙 Dark Mode
- 📱 Responsive Design
- 👨‍💼 Admin Dashboard
- 📊 Order Tracking

## 🛠️ Tech Stack

- Frontend: React.js
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT
- Styling: Tailwind CSS

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## 🔧 Installation

1. Clone the repository
   ```bash
   git clone https://github.com/n190166/BiryaniJunction
   cd biryani-junction
   ```

2. Install dependencies
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables
   ```bash
   # In /server/.env
   PORT=5000
   MONGODB_URI=mongodb+srv://yamini:Yaminisri@cluster0.fu3y3gv.mongodb.net/biryani-junction?retryWrites=true&w=majority&appName=Cluster0
    JWT_SECRET=mySuperSecretKey123
   NODE_ENV=development
   ```

4. Start the application
   ```bash
   # Start MongoDB
   mongod

   # Start backend (in /server)
   npm start

   # Start frontend (in /client)
   npm start
   ```

## 🌐 Access Points

- Website: http://localhost:3000
- Admin Panel: http://localhost:3000/admin
- API: http://localhost:5000/api

## 👨‍💼 Admin Access

```
Email: admin@biryanijunction.com
Password: admin123
```

## 📁 Project Structure

```
biryani-junction/
├── client/                # Frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── pages/         # Page components
│   │   └── utils/         # Helper functions
│   └── public/            # Static files
└── server/                # Backend
    ├── routes/            # API routes
    ├── models/            # Database models
    ├── middleware/        # Custom middleware
    └── server.js          # Entry point
```

## 📝 API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login

### Orders
- GET /api/orders
- POST /api/orders
- PUT /api/orders/:id

### Products
- GET /api/products
- POST /api/products (admin)
- PUT /api/products/:id (admin)
- DELETE /api/products/:id (admin)

## 👥 Contact

- Name: Yamini sri krishnaveni illa
- Email: yaminisrikrishnaveniilla@gmail.com
- Phone: +91 7995802047
- Location: Rajahmundry, Andhra Pradesh, India


