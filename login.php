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
    
    $email = sanitizeInput($input['email'] ?? '');
    $password = $input['password'] ?? '';
    
    // Validate input
    if (empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Email and password are required']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email format']);
        exit;
    }
    
    // Attempt login
    $user = $auth->login($email, $password);
    
    if ($user) {
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'user' => $user,
            'redirect' => 'dashboard.php'
        ]);
    } else {
        // Add delay to prevent brute force attacks
        sleep(1);
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
    }
    
} catch (Exception $e) {
    error_log("Login API error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Server error. Please try again later.']);
}
?>