<?php
// configuracion.php - Conexión a la base de datos

$host = 'localhost';
$port = 3306;
$dbname = 'inmobiliaria';
$user = 'root';
$password = '';

define('DEBUG_MODE', true);

function getDBConnection() {
    global $host, $port, $dbname, $user, $password;
    try {
        $pdo = new PDO(
            "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4",
            $user,
            $password
        );
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        return $pdo;
    } catch (PDOException $e) {
        if (DEBUG_MODE) {
            die("Error de conexión: " . $e->getMessage());
        } else {
            die("Error interno.");
        }
    }
}

function redirect($url) {
    header("Location: $url");
    exit;
}

function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

function isAdmin() {
    return isset($_SESSION['rol']) && $_SESSION['rol'] === 'admin';
}

function validarNombre($nombre) {
    return preg_match('/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]*(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]*)+$/', $nombre);
}

function validarContrasena($password) {
    return preg_match('/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/', $password);
}

function validarFecha($fecha) {
    $hoy = date('Y-m-d');
    $fechaLimite = date('Y-m-d', strtotime('-100 years'));
    return ($fecha <= $hoy && $fecha >= $fechaLimite);
}
?>