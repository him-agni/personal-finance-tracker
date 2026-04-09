# Personal Finance Tracker

A full-stack web application for tracking personal income and expenses. Built with React for the frontend and Node.js/Express for the backend, with MongoDB for data storage.

<img width="894" height="885" alt="image" src="https://github.com/user-attachments/assets/14060904-0a0e-451e-b770-b8fe32ff3f6a" />
Vercel link - https://personal-finance-tracker-tkfm.vercel.app/

## Features

- **User Authentication**: Secure login and registration system using JWT tokens
- **Transaction Management**: Add, edit, delete, and view income and expense transactions
- **Dashboard**: Overview of financial data with interactive charts
- **Budget Tracking**: Set monthly budget limits and monitor spending
- **Data Visualization**: Charts showing income vs expenses using Recharts
- **Filtering**: Filter transactions by type (all, income, expense)
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend

- React 18
- React Router DOM for routing
- Recharts for data visualization
- Axios for API calls
- Context API for state management

### Backend

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin requests

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd personal-finance-tracker
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**

   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the `server` directory with the following variables:

   ```
   MONGO_URI=mongodb://localhost:27017/finance-tracker
   JWT_SECRET=your-secret-key-here
   PORT=5000
   ```

   For MongoDB Atlas, replace the MONGO_URI with your connection string.

## Running the Application

1. **Start the backend server**

   ```bash
   cd server
   npm run dev
   ```

   The server will start on http://localhost:5000

2. **Start the frontend**
   ```bash
   cd client
   npm start
   ```
   The React app will start on http://localhost:3000

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Transactions

- `GET /api/transactions` - Get all user transactions
- `POST /api/transactions` - Create a new transaction
- `PUT /api/transactions/:id` - Update a transaction
- `DELETE /api/transactions/:id` - Delete a transaction

## Project Structure

```
personal-finance-tracker/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── utils/          # Utility functions
│   │   └── App.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── index.js            # Server entry point
│   └── package.json
└── README.md
```

## Usage

1. Register a new account or login with existing credentials
2. Add your income and expense transactions
3. View your financial overview on the dashboard
4. Set a budget limit to track spending
5. Use the charts to visualize your financial data
6. Filter transactions to see specific types

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- React documentation and community
- Express.js framework
- MongoDB documentation
- Recharts library for data visualization
