# Hospital Management System

A simple hospital management system built with HTML, CSS, JavaScript, and MySQL.

## Setup Instructions

### 1. Database Setup
- Install MySQL on your system
- Open MySQL command line or phpMyAdmin
- Run the SQL script: `database/schema.sql`

### 2. Backend Setup
```bash
cd server
npm install
node server.js
```

### 3. Frontend Setup
- Open `index.html` in your browser
- Or use a local server like Live Server (VS Code extension)

## Features
- Patient management (Add, View)
- Dashboard interface
- MySQL database integration
- RESTful API

## Database Configuration
Edit `server/server.js` to update MySQL credentials:
```javascript
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'hospital_hms'
});
```

## API Endpoints
- GET `/api/patients` - Get all patients
- GET `/api/patients/:id` - Get single patient
- POST `/api/patients` - Add new patient
- PUT `/api/patients/:id` - Update patient
- DELETE `/api/patients/:id` - Delete patient
