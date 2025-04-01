# Authentication App Frontend

A modern React application with user authentication features including login and registration.

## Tech Stack

- **React**: Frontend library for building user interfaces
- **TypeScript**: Static type checking for JavaScript
- **@tanstack/react-query**: Data fetching and state management
- **React Router**: Navigation and routing
- **React Hook Form**: Form handling and validation
- **Zod**: Schema validation
- **Axios**: HTTP client
- **Tailwind CSS**: Utility-first CSS framework

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/               # Base UI components (Button, Input, etc.)
│   ├── LoginForm.tsx     # Login form component
│   └── RegistrationForm.tsx  # Registration form component
├── hooks/                # Custom React hooks
│   └── useAuth.ts        # Authentication hook
├── pages/                # Application pages
│   ├── LoginPage.tsx     # Login page
│   ├── RegistrationPage.tsx  # Registration page
│   └── Dashboard.tsx     # Protected dashboard page
├── services/             # API services
│   └── api.ts            # API client and endpoints
├── types/                # TypeScript type definitions
│   └── user.ts           # User-related types
├── utils/                # Utility functions
│   └── validation.ts     # Form validation schemas
├── App.tsx               # Main application component
└── index.tsx             # Application entry point
```

## Setup Instructions

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone 
   cd frontend
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
   Adjust the URL according to your backend configuration.

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev


npm start
# or
yarn start
```

### Production Build

Create an optimized production build:

```bash
npm run build
# or
yarn build
```

The build files will be in the `build` directory and can be served using any static file server.

## Connecting to the Backend

The frontend is configured to connect to the backend API using the `REACT_APP_API_URL` environment variable. Make sure the backend is running before using authentication features.

## Authentication Flow

1. Users can navigate between login (`/`) and registration (`/register`) pages
2. Upon successful authentication (login or registration), users are redirected to the dashboard (`/dashboard`)
3. The dashboard has a logout feature that redirects back to login

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run tests
- `npm run eject` - Eject from create-react-app configuration
