<?php 

require_once __DIR__ . '/../includes/app.php';

use Controllers\AdminController;
use Controllers\APIController;
use Controllers\CitaController;
use Controllers\LoginController;
use MVC\Router;

$router = new Router();

//Iniciar Sesión

$router->get('/', [LoginController::class, 'login']);
$router->post('/', [LoginController::class, 'login']);

//Cerrar sesión
$router->get('/logout', [LoginController::class, 'logout']);

//Recuperar password
$router->get('/olvide', [LoginController::class, 'olvide']);
$router->post('/olvide', [LoginController::class, 'olvide']);
$router->get('/recuperar', [LoginController::class, 'recuperar']);
$router->post('/recuperar', [LoginController::class, 'recuperar']);

//Crear cuenta
$router->get('/crear-cuenta', [LoginController::class, 'crear']);
$router->post('/crear-cuenta', [LoginController::class, 'crear']);

//Confirmar cuenta
$router->get('/confirmar-cuenta', [LoginController::class, 'confirmar']);

$router->post('/mensaje', [LoginController::class, 'mensaje']);

//AREA PRIVADA
$router->get('/cita', [CitaController::class, 'index']);
$router->get('/admin', [AdminController::class, 'index']);

// API de citas
$router -> get('/api/servicios', [APIController::class, 'index']);
$router -> post('/api/citas', [APIController::class, 'guardar']);
$router -> post('/api/eliminar', [APIController::class, 'eliminar']);

// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();