<?php
require_once __DIR__ . '/config.php';

class Auth {
    private $volunteersCollection;
    private $sessionsCollection;
    
    public function __construct() {
        global $volunteersCollection, $sessionsCollection;
        $this->volunteersCollection = $volunteersCollection;
        $this->sessionsCollection = $sessionsCollection;
    }
    
    public function isLoggedIn() {
        return isset($_SESSION['volunteer_id']) && isset($_SESSION['volunteer_email']);
    }
    
    public function getCurrentUser() {
        if (!$this->isLoggedIn()) {
            return null;
        }
        
        try {
            $user = $this->volunteersCollection->findOne([
                '_id' => new MongoDB\BSON\ObjectId($_SESSION['volunteer_id']),
                'status' => 'active'
            ]);
            
            if ($user) {
                return [
                    'id' => (string)$user['_id'],
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'role' => $user['role'] ?? 'volunteer',
                    'created_at' => $user['created_at']
                ];
            }
            
            return null;
        } catch (Exception $e) {
            error_log("Get current user error: " . $e->getMessage());
            return null;
        }
    }
    
    public function login($email, $password) {
        try {
            $user = $this->volunteersCollection->findOne([
                'email' => strtolower(trim($email)),
                'status' => 'active'
            ]);
            
            if ($user && password_verify($password, $user['password'])) {
                // Create session
                $_SESSION['volunteer_id'] = (string)$user['_id'];
                $_SESSION['volunteer_email'] = $user['email'];
                $_SESSION['volunteer_name'] = $user['name'];
                $_SESSION['volunteer_role'] = $user['role'] ?? 'volunteer';
                $_SESSION['login_time'] = time();
                
                // Update last login
                $this->volunteersCollection->updateOne(
                    ['_id' => $user['_id']],
                    [
                        '$set' => [
                            'last_login' => new MongoDB\BSON\UTCDateTime(),
                            'updated_at' => new MongoDB\BSON\UTCDateTime()
                        ]
                    ]
                );
                
                // Store session in database
                $this->sessionsCollection->insertOne([
                    'user_id' => $user['_id'],
                    'session_id' => session_id(),
                    'ip_address' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
                    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
                    'created_at' => new MongoDB\BSON\UTCDateTime(),
                    'expires_at' => new MongoDB\BSON\UTCDateTime((time() + 3600) * 1000)
                ]);
                
                return [
                    'id' => (string)$user['_id'],
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'role' => $user['role'] ?? 'volunteer'
                ];
            }
            
            return false;
        } catch (Exception $e) {
            error_log("Login error: " . $e->getMessage());
            return false;
        }
    }
    
    public function register($name, $email, $password) {
        try {
            // Check if email already exists
            $existingUser = $this->volunteersCollection->findOne([
                'email' => strtolower(trim($email))
            ]);
            
            if ($existingUser) {
                return ['success' => false, 'message' => 'Email already registered'];
            }
            
            // Validate password strength
            if (!$this->isValidPassword($password)) {
                return ['success' => false, 'message' => 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'];
            }
            
            // Hash password
            $hashedPassword = password_hash($password, PASSWORD_ARGON2ID);
            
            // Insert new user
            $result = $this->volunteersCollection->insertOne([
                'name' => sanitizeInput($name),
                'email' => strtolower(trim($email)),
                'password' => $hashedPassword,
                'role' => 'volunteer',
                'status' => 'active',
                'created_at' => new MongoDB\BSON\UTCDateTime(),
                'updated_at' => new MongoDB\BSON\UTCDateTime(),
                'profile' => [
                    'avatar' => null,
                    'bio' => '',
                    'phone' => '',
                    'address' => ''
                ]
            ]);
            
            return ['success' => true, 'id' => (string)$result->getInsertedId()];
            
        } catch (Exception $e) {
            error_log("Registration error: " . $e->getMessage());
            return ['success' => false, 'message' => 'Registration failed. Please try again.'];
        }
    }
    
    public function logout() {
        if ($this->isLoggedIn()) {
            // Remove session from database
            $this->sessionsCollection->deleteMany([
                'session_id' => session_id()
            ]);
        }
        
        // Destroy session
        session_destroy();
        return true;
    }
    
    public function requireLogin() {
        if (!$this->isLoggedIn()) {
            if ($this->isAjaxRequest()) {
                http_response_code(401);
                echo json_encode(['error' => 'Authentication required']);
                exit;
            } else {
                header('Location: index.html');
                exit;
            }
        }
    }
    
    private function isValidPassword($password) {
        return strlen($password) >= 8 &&
               preg_match('/[a-z]/', $password) &&
               preg_match('/[A-Z]/', $password) &&
               preg_match('/[0-9]/', $password) &&
               preg_match('/[^a-zA-Z0-9]/', $password);
    }
    
    private function isAjaxRequest() {
        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && 
               strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
    }
}

// Global auth instance
$auth = new Auth();
?>