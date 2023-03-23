<?php

namespace Controllers;

use MVC\Router;

class ServicioController
{
    public static function index(Router $router)
    {

        session_start();

        $router->render('services/index', [
            'nombre' => $_SESSION['nombre']
        ]);
    }
    public static function crear(Router $router)
    {

        session_start();

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        }
        $router->render('services/crear', [
            'nombre' => $_SESSION['nombre']
        ]);
    }
    public static function actualizar(Router $router)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        }
        $router -> render('services/actualizar', [
            'nombre' => $_SESSION['nombre']
        ]);
    }
    public static function eliminar(Router $router)
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        }
    }
}
