# Full Stack Authentication System

A modern full-stack authentication system built with React (Frontend) and NestJS (Backend).

## Features

- User authentication (Sign Up, Sign In, Sign Out)
- Protected routes
- Real-time error handling
- Email validation
- Comprehensive logging system

## Tech Stack

### Frontend
- React with TypeScript
- Material UI for components
- Vite for build tooling
- Axios for API communication

### Backend
- NestJS framework
- MongoDB database
- JWT authentication
- Built-in logging system

## Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running
- Git

## Getting Started

Clone the repository:
```bash
git clone <repository-url>
cd full_stack_task
```

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory:
```
MONGODB_URI=mongodb://localhost:27017/auth_db
JWT_SECRET=your_jwt_secret
PORT=3000
```

4. Start the development server:
```bash
npm run start:dev
```

The server will be running at `http://localhost:3000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the client directory:
```
VITE_API_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

The client will be running at `http://localhost:5173`

## Running with Docker

### Prerequisites
- Docker
- Docker Compose

### Quick Start with Docker

1. Clone the repository:
```bash
git clone <repository-url>
cd full_stack_task
```

2. Create necessary environment files:

For server (.env in server directory):
```
MONGODB_URI=mongodb://localhost:27017/auth_db
JWT_SECRET=your_jwt_secret
PORT=3000
```

For client (.env in client directory):
```
VITE_API_URL=http://localhost:3000
```

3. Start the application using Docker Compose:
```bash
docker-compose up --build -d
```

This will:
- Build and start both the client and server containers
- Set up hot-reloading for development
- Make the client available at `http://localhost:5173`
- Make the server available at `http://localhost:3000`

To stop the application:
```bash
docker-compose down
```

### Docker Development Features
- Hot-reloading enabled for both client and server
- No need to install Node.js or npm locally
- Consistent development environment across team members
- Volume mounts for real-time code changes

## Project Structure

```
full_stack_task/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   ├── constants/     # Shared constants
│   │   └── types/         # TypeScript types
│   └── ...
├── server/                 # Backend NestJS application
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   ├── users/         # Users module
│   │   └── ...
│   └── ...
└── README.md
```

## API Endpoints

### Authentication
- `POST /auth/sign-up` - Register a new user
- `POST /auth/sign-in` - Login user
- `POST /auth/sign-out` - Logout user
- `GET /auth/me` - Get user profile

### Application
- `GET /` - Get welcome message

## Error Handling

The application includes comprehensive error handling:
- Frontend error interceptors
- Standardized error messages
- Network error handling
- Input validation


## Building for Production

### Backend
```bash
cd server
npm run build
```

### Frontend
```bash
cd client
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 