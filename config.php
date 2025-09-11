<?php
require_once __DIR__ . '/vendor/autoload.php';

// Load environment variables if .env exists
if (file_exists(__DIR__ . '/.env')) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
}

// MongoDB Atlas Configuration
$mongoUri = $_ENV['MONGODB_URI'] ?? "mongodb+srv://priyanka63i92_db_user:YOUR_ACTUAL_PASSWORD@soul.mygesgj.mongodb.net/?retryWrites=true&w=majority";

try {
    // Create MongoDB connection
    $mongoClient = new MongoDB\Client($mongoUri, [
        'serverApi' => new MongoDB\Driver\ServerApi('1'),
        'connectTimeoutMS' => 30000,
        'socketTimeoutMS' => 30000,
        'serverSelectionTimeoutMS' => 5000,
    ]);
    
    // Select database and collections
    $database = $mongoClient->selectDatabase('SoULearn');
    $volunteersCollection = $database->selectCollection('volunteers');
    $sessionsCollection = $database->selectCollection('sessions');
    
    // Test connection
    $mongoClient->selectDatabase('admin')->command(['ping' => 1]);
    
} catch (MongoDB\Driver\Exception\ConnectionTimeoutException $e) {
    die(json_encode(['error' => 'Database connection timeout. Please try again later.']));
} catch (MongoDB\Driver\Exception\AuthenticationException $e) {
    die(json_encode(['error' => 'Database authentication failed. Please contact support.']));
} catch (Exception $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
}

// Start session with secure settings
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);
ini_set('session.use_only_cookies', 1);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Helper functions
function generateId() {
    return new MongoDB\BSON\ObjectId();
}

function idToString($id) {
    return $id instanceof MongoDB\BSON\ObjectId ? (string)$id : $id;
}

function sanitizeInput($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}
?>