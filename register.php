<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');

require_once __DIR__ . '/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

try {
    // Get input data
    $rawInput = file_get_contents('php://input');
    $input = json_decode($rawInput, true);
    
    if (!$input) {
        $input = $_POST;
    }
    
    $name = sanitizeInput($input['name'] ?? '');
    $email = sanitizeInput($input['email'] ?? '');
    $password = $input['password'] ?? '';
    $confirmPassword = $input['confirmPassword'] ?? '';
    
    // Validate input
    if (empty($name) || empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email format']);
        exit;
    }
    
    if ($password !== $confirmPassword) {
        echo json_encode(['success' => false, 'message' => 'Passwords do not match']);
        exit;
    }
    
    // Attempt registration
    $result = $auth->register($name, $email, $password);
    
    if ($result['success']) {
        echo json_encode([
            'success' => true,
            'message' => 'Registration successful! You can now login.',
            'user_id' => $result['id']
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => $result['message']]);
    }
    
} catch (Exception $e) {
    error_log("Registration API error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error. Please try again later.']);
}
?>