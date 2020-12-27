<?php
class Conexion{//Utilizamos PDO para hacer una conexión mas estable, fácil y con buen rendimiento
    public static function Conectar(){
        define('servidor','us-cdbr-east-02.cleardb.com');
        define('nombre_bd','gnosoft_prueba');
        define('usuario','b87f916543010e');
        define('password','bb6d2e19');
        $opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');
        try{
$conexion = new PDO("mysql:host=".servidor."; dbname=".nombre_bd, usuario, password, $opciones);
return $conexion;
        }catch(Exception $e){
            die("El error de conexion es: ". $e->getMessage());
        }
    }
}
?>