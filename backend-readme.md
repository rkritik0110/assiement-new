# Authentication API Backend

A Node.js backend API with authentication features, PostgreSQL database integration with Prisma ORM, and connection to Neon DB.

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **TypeScript**: Static type checking
- **Prisma**: ORM for database interactions
- **PostgreSQL**: Database (via Neon DB)
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT authentication
- **zod**: Validation
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## Project Structure

```
src/
├── controllers/         # Route controllers
│   └── userController.ts # User-related controllers
├── middleware/          # Express middleware
│   ├── errorHandler.ts  # Authentication middleware
│   └── validateRequests.ts    # Request validation middleware
├── prisma/              # Prisma ORM configuration
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Database migrations
├── routes/              # API routes
│   └── userRoutes.ts    # User-related routes
├── utils/               # Utility functions
│   ├── errorTypes.ts        # Error handling utilities
│   └── passwordUtils.ts     # Password hashing utilities
├── app.ts               # Express application setup
└── server.ts            # Server entry point
```

## Setup Instructions

### Prerequisites

- Node.js
- npm or yarn
- PostgreSQL database (or Neon DB account)

### Installation

1. Clone the repository
   ```bash
   git clone 
   cd backend
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   # Server
   PORT=5000   
   # JWT
   JWT_SECRET=your_jwt_secret_key   
   # Database - Neon DB
   DATABASE_URL="postgresql://username:password@your-neon-db-host:5432/database?sslmode=require"
   ```

### Setting up Prisma with Neon DB

1. **Sign up for Neon DB**
   - Visit [Neon DB](https://neon.tech/) and create an account
   - Create a new project
   - Get your connection string from the dashboard

2. **Update the `.env` file** with your Neon DB connection string:
   ```
   DATABASE_URL="postgresql://username:password@your-neon-db-host:5432/database?sslmode=require"
   ```

3. **Initialize Prisma**
   ```bash
   npx prisma init
   ```

4. **Define your schema in `prisma/schema.prisma`**:
   ```prisma
   generator client {
     provider = "prisma-client-js"
   }
   
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   
   model User {
     id        Int      @id @default(autoincrement())
     email     String   @unique
     password  String
     createdAt DateTime @default(now())
     updatedAt DateTime @updatedAt
   }
   ```

5. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

6. **Create and apply migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The API will be available at [http://localhost:5000](http://localhost:5000).

### Production Mode

Build and start in production mode:

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## API Endpoints

### Authentication

## Postman Testing

- **Register**: `POST /api/users/register`
  - Request: `{ "email": "user@example.com", "password": "password" }`
  - Response: `{ "status": "success", "message": "User registered successfully", "data": { "id": 1, "email": "user@example.com" } }`

- **Login**: `POST /api/users/login`
  - Request: `{ "email": "user@example.com", "password": "password" }`
  - Response: `{ "status": "success", "message": "Login successful", "data": { "user": { "id": 1, "email": "user@example.com" }, "token": "jwt_token" } }`

### Protected Routes

- **Get User Profile**: `GET /api/users/profile`
  - Headers: `{ "Authorization": "Bearer jwt_token" }`
  - Response: `{ "status": "success", "data": { "user": { "id": 1, "email": "user@example.com" } } }`

## Error Handling

The API returns consistent error responses:

```json
{
  "status": "error",
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```


The API returns on correct credentials:
```json
{
  "status":"success",
  "message":"Login successful",
  "data":{
      "id":1,
      "email":"test@example.com"
    }
}
```


## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run test` - Run tests
