# MERN Role Management Page with Signup and Login Functionalities

This is a MERN (MongoDB, Express.js, React.js, Node.js) stack project implementing role management, signup, and login functionalities. Users can register with their email, username, role (admin or user), and password. Passwords are securely encrypted using bcrypt. Authentication is handled using JWT (JSON Web Tokens). Upon successful login, users are redirected to specific pages based on their role, with personalized greetings.

## Demo Link
- Frontend Client - https://areness-role-management-client.onrender.com
- Backend Server - https://areness-role-management-server.onrender.com

## Folder Structure

```
- client
    - context
        - userContext.jsx
    - src
        - components
            - Navbar.jsx
        - pages
            - Home.jsx
            - Login.jsx
            - Register.jsx
            - Admin.jsx
            - User.jsx
        - App.jsx
        - package.json
            - contains dependencies for React.js application
- server
    - controllers
        - authController.js
    - helpers
        - bcrypt.js
    - models
        - userModel.js
    - routes
        - authRoutes.js
    - .env
    - server.js
    - package.json
        - contains dependencies for Node.js server
```

## Features

1. **Signup Functionality**: Users can register with their email, username, role (admin or user), and password. Passwords are securely encrypted using bcrypt.
   
2. **Login Feature**: Users can authenticate using their email and password.
   
3. **JWT Authentication**: Utilizes JSON Web Tokens for token-based authentication.

4. **Redirect Upon Login**: Upon successful login:
    - If the user is an admin, they are redirected to the admin page with the greeting "Hello Admin."
    - If the user is a regular user, they are redirected to the user page with the greeting "Hello User."

5. **Error Handling and Validation**: Proper error handling and validation for signup and login processes should is implemented.

6. **Database Schema**: Designed and implemented a MongoDB database schema to store user information securely.

7. **Middleware**: Implemented necessary middleware for authentication and authorization.

## Dependencies

### Client Side
- React.js
- react-router-dom
- axios
- react-hot-toast

### Server Side
- Express.js
- Mongoose
- bcrypt
- jsonwebtoken
- dotenv
- nodemon
- cors
- cookie-parser

## Getting Started

1. Clone the repository: `git clone https://github.com/MYSTYX7/Areness-Role-Management.git`
2. Navigate to the client folder: `cd client` and install dependencies: `npm install`
3. Navigate to the server folder: `cd ../server` and install dependencies: `npm install`
4. Start MongoDB server
5. Start the server: `npm start` in the server directory
6. Start the client: `npm start` in the client directory
7. Access the application in your browser at `http://localhost:3000`

## Environment Variables

Make sure to set up the following environment variables in the `.env` file located in the server directory:

```
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

## Contributing

Contributions are welcome! Fork the repository and submit a pull request for any enhancements or fixes.

## License

This project is licensed under the [MIT License](LICENSE).