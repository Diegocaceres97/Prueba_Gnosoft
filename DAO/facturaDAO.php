<?php

include_once 'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

//Necesario para recibir parametros con Axios
$_POST = json_decode(file_get_contents("php://input"),true);

//Recepcion de los datos enviados mediante POST desde main js
$opcion= (isset($_POST['opcion'])) ? $_POST['opcion'] : '';

$id= (isset($_POST['id'])) ? $_POST['id'] : '';
$nombre= (isset($_POST['nombre'])) ? $_POST['nombre'] : '';
$fecha= (isset($_POST['fecha'])) ? $_POST['fecha'] : '';

$tra_dat =(isset($_POST['Transaction'])) ? $_POST['Transaction'] : '';
$ultimo_id;


switch($opcion){
    case 1: //Al registrar nueva factura
            $consulta = $tra_dat;
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            $data = $tra_dat;
    break;
        case 2: //Al editar una factura
            $consulta = "UPDATE facturas SET fact_nombre='$nombre', fact_fecha='$fecha' where facturas_pk='$id'";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
        case 3: //Al eliminar una factura y su registro en detalles
            $consulta = "START TRANSACTION;
            DELETE FROM facturas where facturas_pk='$id';
            DELETE FROM detallesfactura where defa_fact_fk='$id';
            COMMIT;";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
        break;
        case 4://Al listar
            $consulta = "SELECT facturas_pk, fact_nombre, fact_fecha, fact_subtotal, fact_iva, fact_total FROM facturas";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            $data=$resultado->fetchAll(PDO::FETCH_ASSOC);//FetchAll lo que hace es devolvernos un array con todo el conjunto de resultados
        break;
        case 5://Seleccion del ultimo ID de factura
            $stmt = $conexion->query("SELECT * FROM facturas ORDER BY facturas_pk DESC LIMIT 0,1"); //Metodo con el cual obtenemos el ultimo id
            $ultimo_id = $stmt->fetchColumn();//por medio de PDO
            $data = $ultimo_id;
            break;
         case 6://Caso creado para ejecutar consultas sql/querys
            $consulta = "UPDATE productos SET prod_hist_cant = 1 WHERE productos_pk = 81 ";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
            break;
}
print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion = null; //Cerramos la conexion
?>