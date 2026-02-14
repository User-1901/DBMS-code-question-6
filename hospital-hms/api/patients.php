<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getPatients();
        break;
    case 'POST':
        addPatient();
        break;
    case 'PUT':
        updatePatient();
        break;
    case 'DELETE':
        deletePatient();
        break;
    default:
        echo json_encode(['error' => 'Method not allowed']);
        break;
}

function getPatients() {
    global $conn;
    
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        $sql = "SELECT * FROM patients WHERE id = $id";
        $result = $conn->query($sql);
        
        if ($result->num_rows > 0) {
            echo json_encode($result->fetch_assoc());
        } else {
            echo json_encode(['error' => 'Patient not found']);
        }
    } else {
        $sql = "SELECT * FROM patients ORDER BY created_at DESC";
        $result = $conn->query($sql);
        
        $patients = [];
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $patients[] = $row;
            }
        }
        echo json_encode($patients);
    }
}

function addPatient() {
    global $conn;
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    $name = $conn->real_escape_string($data['name']);
    $age = intval($data['age']);
    $contact = $conn->real_escape_string($data['contact']);
    
    $sql = "INSERT INTO patients (name, age, contact) VALUES ('$name', $age, '$contact')";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode([
            'id' => $conn->insert_id,
            'name' => $name,
            'age' => $age,
            'contact' => $contact
        ]);
    } else {
        echo json_encode(['error' => $conn->error]);
    }
}

function updatePatient() {
    global $conn;
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    $id = intval($data['id']);
    $name = $conn->real_escape_string($data['name']);
    $age = intval($data['age']);
    $contact = $conn->real_escape_string($data['contact']);
    
    $sql = "UPDATE patients SET name='$name', age=$age, contact='$contact' WHERE id=$id";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['message' => 'Patient updated successfully']);
    } else {
        echo json_encode(['error' => $conn->error]);
    }
}

function deletePatient() {
    global $conn;
    
    $id = intval($_GET['id']);
    
    $sql = "DELETE FROM patients WHERE id=$id";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['message' => 'Patient deleted successfully']);
    } else {
        echo json_encode(['error' => $conn->error]);
    }
}

$conn->close();
?>
