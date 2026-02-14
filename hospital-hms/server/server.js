const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hospital_hms'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Routes

// Get all patients
app.get('/api/patients', (req, res) => {
    const query = 'SELECT * FROM patients';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// Get single patient
app.get('/api/patients/:id', (req, res) => {
    const query = 'SELECT * FROM patients WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results[0]);
    });
});

// Add new patient
app.post('/api/patients', (req, res) => {
    const { name, age, contact } = req.body;
    const query = 'INSERT INTO patients (name, age, contact) VALUES (?, ?, ?)';
    
    db.query(query, [name, age, contact], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: result.insertId, name, age, contact });
    });
});

// Update patient
app.put('/api/patients/:id', (req, res) => {
    const { name, age, contact } = req.body;
    const query = 'UPDATE patients SET name = ?, age = ?, contact = ? WHERE id = ?';
    
    db.query(query, [name, age, contact, req.params.id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Patient updated successfully' });
    });
});

// Delete patient
app.delete('/api/patients/:id', (req, res) => {
    const query = 'DELETE FROM patients WHERE id = ?';
    
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Patient deleted successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
