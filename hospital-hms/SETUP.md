# Hospital Management System - Setup Guide

## Requirements
- XAMPP (or WAMP/MAMP) - includes Apache, PHP, and MySQL
- Web browser

## Setup Steps

### 1. Install XAMPP
- Download from: https://www.apachefriends.org/
- Install and start Apache and MySQL services

### 2. Create Database
- Open phpMyAdmin: http://localhost/phpmyadmin
- Click "New" to create a database
- Name it: `hospital_hms`
- Click "Create"
- Go to the SQL tab
- Copy and paste the contents of `database/schema.sql`
- Click "Go" to execute

### 3. Move Project Files
- Copy the `hospital-hms` folder to XAMPP's `htdocs` directory
  - Windows: `C:\xampp\htdocs\`
  - Mac: `/Applications/XAMPP/htdocs/`
  - Linux: `/opt/lampp/htdocs/`

### 4. Configure Database (if needed)
- Edit `api/config.php` if your MySQL credentials are different:
  ```php
  define('DB_HOST', 'localhost');
  define('DB_USER', 'root');
  define('DB_PASS', ''); // Your MySQL password
  define('DB_NAME', 'hospital_hms');
  ```

### 5. Run the Application
- Open your browser
- Go to: http://localhost/hospital-hms/
- You should see the Hospital Management System dashboard

## Troubleshooting

### "Error adding patient" message
- Make sure XAMPP Apache and MySQL are running
- Check if database `hospital_hms` exists in phpMyAdmin
- Verify the SQL schema was executed successfully

### Database connection error
- Check MySQL is running in XAMPP Control Panel
- Verify database credentials in `api/config.php`
- Make sure database `hospital_hms` exists

### Page not loading
- Ensure Apache is running in XAMPP
- Check the URL is correct: http://localhost/hospital-hms/
- Clear browser cache

## Testing
1. Open http://localhost/hospital-hms/
2. You should see 3 sample patients
3. Try adding a new patient using the form
4. The new patient should appear in the list

## Features
- View all patients
- Add new patients
- Responsive design
- Dark theme with animations
