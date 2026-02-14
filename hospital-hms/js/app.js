// Hospital Management System - Main Application

// API Base URL
const API_URL = 'http://localhost/hospital-hms/api';

// Load patients on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPatients();
    
    // Form submission
    document.getElementById('patientForm').addEventListener('submit', handleAddPatient);
});

// Load patients from server
async function loadPatients() {
    try {
        const response = await fetch(`${API_URL}/patients.php`);
        const patients = await response.json();
        
        if (patients.error) {
            throw new Error(patients.error);
        }
        
        renderPatients(patients);
    } catch (error) {
        console.error('Error loading patients:', error);
        // Show sample data if server is not running
        renderPatients([
            { id: 1, name: 'John Doe', age: 35, contact: '123-456-7890' },
            { id: 2, name: 'Jane Smith', age: 28, contact: '098-765-4321' }
        ]);
    }
}

// Render patients to the DOM
function renderPatients(patients) {
    const patientList = document.getElementById('patientList');
    patientList.innerHTML = '';
    
    patients.forEach(patient => {
        const card = createPatientCard(patient);
        patientList.appendChild(card);
    });
}

// Create patient card element
function createPatientCard(patient) {
    const card = document.createElement('div');
    card.className = 'patient-card fade-in';
    card.innerHTML = `
        <h3>${patient.name}</h3>
        <p>Age: ${patient.age}</p>
        <p>Contact: ${patient.contact}</p>
    `;
    return card;
}

// Handle add patient form submission
async function handleAddPatient(e) {
    e.preventDefault();
    
    const name = document.getElementById('patientName').value;
    const age = document.getElementById('patientAge').value;
    const contact = document.getElementById('patientContact').value;
    
    const patient = { name, age, contact };
    
    try {
        const response = await fetch(`${API_URL}/patients.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
        });
        
        const result = await response.json();
        
        if (result.error) {
            throw new Error(result.error);
        }
        
        // Clear form
        document.getElementById('patientForm').reset();
        // Reload patients
        loadPatients();
        alert('Patient added successfully!');
    } catch (error) {
        console.error('Error adding patient:', error);
        alert('Error adding patient. Make sure XAMPP/MySQL is running and database is set up.');
    }
}
