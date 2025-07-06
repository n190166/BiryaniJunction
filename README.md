# 🍚 Biryani Junction

A full-stack restaurant ordering system built with React, Node.js, Express, and MongoDB.

## 🎥 Demo  
🏠 Home Page
![Screenshot_4-12-2024_123011_localhost](https://github.com/user-attachments/assets/8ec704b9-704d-427d-ac6b-b43b99e7e242)
🔑 Sign-In Page
![Screenshot_4-12-2024_123312_localhost](https://github.com/user-attachments/assets/1b0b1c0c-147a-40a3-a942-e90f799f2689)
📝 Sign-Up Page
![Screenshot_4-12-2024_123329_localhost](https://github.com/user-attachments/assets/fec7830e-f5c1-4985-a76d-5639f5397740)
🍛 Biryanis Page
![Screenshot_4-12-2024_123050_localhost](https://github.com/user-attachments/assets/ee5ada20-5b4a-4e47-bb69-c5310f1b7dcb)
🍤 Starters Page
![Screenshot_4-12-2024_12314_localhost](https://github.com/user-attachments/assets/37cbed7d-0f3a-4106-80d9-088da4dcec68)
🥤 Drinks Page
![Screenshot_4-12-2024_123116_localhost](https://github.com/user-attachments/assets/e2651728-3327-4271-bd45-8807ce232537)
🛒 Cart Page
![Screenshot_4-12-2024_12326_localhost](https://github.com/user-attachments/assets/9a1aaea8-be7c-4a7f-9fad-d85a37aab20d)
📦 Orders Page
![Screenshot_4-12-2024_123238_localhost](https://github.com/user-attachments/assets/c825b36f-e30e-4add-a5d6-486e9faf5a42)
👤 Profile Page
![Screenshot_4-12-2024_123225_localhost](https://github.com/user-attachments/assets/1f1a9b6f-b928-4bef-b792-0d7ac366b456)
📞 Contact Page
![Screenshot_4-12-2024_123252_localhost](https://github.com/user-attachments/assets/251161fd-4cba-40aa-9123-af15e1f98521)
🗄️ Database
![Screenshot 2024-12-04 144937](https://github.com/user-attachments/assets/f6b33a72-e013-4aec-b9c0-6814976bdb01)



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
   git clone https://github.com/Phinihas/biryani-junction.git
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
   MONGODB_URI=mongodb://localhost:27017/biryani-junction
   JWT_SECRET=biryanijunction2024secretkey
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

- Name: Phinihas
- Email: phinihasgandi@gmail.com
- Phone: +91 7995802047
- Location: Kakinada, Andhra Pradesh, India

## 📱 Social Media

- Instagram: https://www.instagram.com/phinihasgandi/
- Twitter: https://x.com/GandiPhinihas

