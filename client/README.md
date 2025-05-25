# Authentication Frontend

This is the frontend application for the user authentication system. It's built with React, TypeScript, and Material UI.

## Features

- User sign up with email, name, and password validation
- User sign in with email and password
- Protected routes for authenticated users
- Responsive Material UI design
- Form validation using Yup
- Type-safe development with TypeScript

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory and add the following environment variables:
   ```
   VITE_API_URL=http://localhost:3000
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`.

## Build

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
  ├── components/     # React components
  ├── contexts/      # React contexts (Auth)
  ├── services/      # API services
  ├── types/         # TypeScript types
  ├── validations/   # Form validation schemas
  ├── App.tsx        # Main App component
  └── main.tsx       # Application entry point
```

## Dependencies

- React
- React Router DOM
- Material UI
- React Hook Form
- Yup
- Axios
