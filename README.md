# Email Newsletter API

A REST API for managing and sending newsletters built with
Node.js, Express.js, MongoDB and Nodemailer.

## Features
- User authentication with JWT
- Role-based access (admin/user)
- Send newsletters to all subscribers
- Subscribe and unsubscribe functionality
- Protected admin routes

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Nodemailer
- Joi
- dotenv

## How to Run
```
npm install
npm run dev
```

## API Endpoints
- POST   /auth/register           - Register a user
- POST   /auth/login              - Login a user
- POST   /newsletters             - Create newsletter (admin)
- POST   /newsletters/:id/send    - Send newsletter (admin)
- GET    /newsletters             - Get all newsletters
- POST   /subscribe               - Subscribe to newsletter
- POST   /unsubscribe             - Unsubscribe from newsletter
- GET    /subscribers             - Get all subscribers (admin)