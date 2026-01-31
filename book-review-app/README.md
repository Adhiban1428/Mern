# 📚 BookVerse - Book Review Website

A modern, full-stack book review application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## ✨ Features

### 🏠 Welcome Page
- Beautiful hero section with animated floating books
- Feature highlights and statistics
- User testimonials with auto-rotating slider
- Call-to-action sections

### 📖 Books Page
- Grid layout displaying all available books
- Filter books by genre
- Statistics showing total books, genres, and reviews
- Responsive design for all devices

### 🔐 User Authentication
- User registration and login
- JWT-based authentication
- Protected routes for authenticated users

### 📝 Book Management
- Add new books (authenticated users)
- View detailed book information
- Add and view reviews
- Star ratings system

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd book-review-app
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   - Copy `backend/.env.example` to `backend/.env`
   - Update the environment variables:
     ```
     MONGODB_URI=mongodb://localhost:27017/bookverse
     JWT_SECRET=your-super-secret-jwt-key
     PORT=5000
     ```

5. **Seed the Database**
   ```bash
   cd backend
   npm run seed
   ```

6. **Start the Application**
   - **Option 1: Use the batch file (Windows)**
     ```bash
     start.bat
     ```
   
   - **Option 2: Manual start**
     ```bash
     # Terminal 1 - Backend
     cd backend
     npm start
     
     # Terminal 2 - Frontend
     cd frontend
     npm run dev
     ```

### 🌐 Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 📱 Pages Overview

### 1. Welcome Page (`/`)
- Landing page with hero section
- Features overview
- Statistics and testimonials
- Navigation to books and signup

### 2. Books Page (`/books`)
- Browse all available books
- Filter by genre
- View book statistics
- Click to view book details

### 3. Book Details (`/books/:id`)
- Detailed book information
- Reviews and ratings
- Add review (authenticated users)

### 4. Authentication (`/login`, `/signup`)
- User registration and login
- Form validation
- JWT token management

### 5. Add Book (`/add-book`)
- Add new books (authenticated users only)
- Form with validation
- Cover image support

## 🎨 Design Features

### Modern UI/UX
- Gradient backgrounds and glassmorphism effects
- Smooth animations and transitions
- Responsive grid layouts
- Interactive hover effects

### Color Scheme
- Primary: Linear gradient (#667eea to #764ba2)
- Secondary: White with transparency
- Accent: Gold (#ffd700)

### Typography
- Font Family: Inter, system fonts
- Responsive font sizes
- Proper hierarchy and spacing

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool
- **CSS3** - Styling with modern features

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
book-review-app/
├── backend/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── utils/          # Utility functions
│   ├── server.js       # Main server file
│   ├── db.js           # Database connection
│   └── seed.js         # Sample data seeder
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── api/        # API service
│   │   └── App.jsx     # Main app component
│   └── index.html      # HTML template
└── start.bat           # Quick start script
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Add new book (auth required)

### Reviews
- `GET /api/reviews/book/:bookId` - Get reviews for a book
- `POST /api/reviews` - Add review (auth required)

## 🎯 Usage Tips

1. **First Time Setup**: Run the seed script to populate sample books
2. **Adding Books**: Register/login to add new books
3. **Reviews**: Must be logged in to add reviews
4. **Navigation**: Use the navbar to navigate between pages
5. **Responsive**: Works on desktop, tablet, and mobile devices

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder

### Backend (Heroku/Railway)
1. Set environment variables
2. Deploy the backend folder
3. Update frontend API URLs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

---

**Happy Reading! 📚✨**