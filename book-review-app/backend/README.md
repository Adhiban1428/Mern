# Book Review App - Backend

A Node.js + Express backend for the Book Review App with MongoDB and JWT authentication.

## Setup Instructions

1. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Configure Environment Variables**
   - Copy \`.env.example\` to \`.env\`
   - Update \`MONGO_URI\` with your MongoDB connection string
   - Change \`JWT_SECRET\` to a strong secret

3. **Start the Server**
   \`\`\`bash
   npm start
   \`\`\`

   For development with auto-reload:
   \`\`\`bash
   npm run dev
   \`\`\`

## API Endpoints

### Authentication
- \`POST /api/auth/signup\` - Create a new account
- \`POST /api/auth/login\` - Login with email and password

### Books
- \`GET /api/books\` - Get all books
- \`GET /api/books/:id\` - Get book details with reviews
- \`POST /api/books\` - Create a new book (admin only)

### Reviews
- \`POST /api/books/:id/reviews\` - Add a review to a book (requires auth)

## Default Admin Account
Email: admin@example.com
Password: admin123

Set \`isAdmin: true\` manually in MongoDB for the first admin account.

## Technologies Used
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt for password hashing
