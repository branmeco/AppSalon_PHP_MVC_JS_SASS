<?php

namespace Controllers;

use Model\Usuario;
use MVC\Router;
use Classes\Email;

class LoginController
{
    public static function login(Router $router)
    {
        $router->render('auth/login');
    }
    public static function logout()
    {
        echo "Desde logout";
    }
    public static function olvide(Router $router)
    {
        $router->render('auth/olvide-password', [
            
        ]);
    }
    public static function recuperar()
    {
        echo "Desde recuperar";
    }
    public static function crear(Router $router)
    {
        $usuario = new Usuario($_POST);

        //Alertas vacias
        $alertas = [];

        if($_SERVER['REQUEST_METHOD']==='POST'){
            $usuario->sincronizar($_POST);
            $alertas = $usuario->validarNuevaCuenta();

            //Revisar que alertas este vacio
            if(empty($alertas)){
                //Verificar que el usuario no este registrado
                $resultado = $usuario->existeUsuario();

                if($resultado -> num_rows){
                    $alertas = Usuario::getAlertas();
                }else {
                    //Hashear el password
                    $usuario->hashPassword();

                    //Generar un Token único
                    $usuario->crearToken();

                    //Enviar el E-mail
                    $email = new Email($usuario->nombre, $usuario->email, $usuario->token);

                    $email->enviarConfirmacion();

                    //Crear el usuario
                    $resultado = $usuario->guardar();

                    if($resultado){
                        header('Location: /mensaje');
                    }
                }
            }
        }
        $router->render('auth/crear-cuenta', [
            'usuario' => $usuario,
            'alertas' => $alertas
        ]);
    }
    public static function mensaje(Router $router) {
        $router ->render('auth/mensaje');
    }

    public static function confirmar(Router $router){
        $alertas = []; 

        $token = s($_GET['token']);

        $usuario = Usuario::where('token', $token);

        $router->render('auth/confirmar-cuenta', [
            'alertas' => $alertas
        ]);
    }
}
