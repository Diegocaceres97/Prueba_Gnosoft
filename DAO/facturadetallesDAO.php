<?php

include_once 'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

//Necesario para recibir parametros con Axios
$_POST = json_decode(file_get_contents("php://input"),true);

//Recepcion de los datos enviados mediante POST desde main js
$opcion= (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

$id= (isset($_POST['ID'])) ? $_POST['ID'] : '';

//$identificador = $_GET['id'];

switch($opcion){
        case 1://Al listar
            $consulta = "SELECT detallesfactura_pk, defa_fact_fk, defa_detalle, defa_cantidad, defa_valor FROM detallesfactura where defa_fact_fk='$id'";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            $data=$resultado->fetchAll(PDO::FETCH_ASSOC);//FetchAll lo que hace es devolvernos un array con todo el conjunto de resultados
        break;

}
print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion = null; //Cerramos la conexion
?>