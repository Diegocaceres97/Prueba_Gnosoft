<?php

include_once 'conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

//Necesario para recibir parametros con Axios
$_POST = json_decode(file_get_contents("php://input"),true);

//Recepcion de los datos enviados mediante POST desde main js
$opcion= (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$nombre_producto= (isset($_POST['nombre'])) ? $_POST['nombre'] : '';
$cantidad_producto= (isset($_POST['cantidad'])) ? $_POST['cantidad'] : '';
$precio_producto= (isset($_POST['precio'])) ? $_POST['precio'] : '';
$fecha = date("Y-m-d");
$id= (isset($_POST['ID'])) ? $_POST['ID'] : '';
$Dec_sum_res= (isset($_POST['decision'])) ? $_POST['decision'] : '';
switch($opcion){
    case 1: //Al registrar nueva factura
            $consulta = "INSERT INTO productos (prod_nombre,prod_cantidad,prod_precio,prod_fecha,prod_hist_cant) VALUES ('$nombre_producto','$cantidad_producto','$precio_producto','$fecha','$cantidad_producto')";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
    break;
        case 2://Al listar
            $consulta = "SELECT facturas_pk, fact_nombre, fact_fecha, fact_subtotal, fact_iva, fact_total FROM facturas";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            $data=$resultado->fetchAll(PDO::FETCH_ASSOC);//FetchAll lo que hace es devolvernos un array con todo el conjunto de resultados
        break;
        case 3://Para obtener
            
            $consulta = "SELECT * FROM productos WHERE prod_cantidad > 0";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            $data=$resultado->fetchAll(PDO::FETCH_ASSOC);//FetchAll lo que hace es devolvernos un array con todo el conjunto de resultados
        break;
        case 4://Para cuando selecciona en el boton de productos
            $consulta;
            if($id==0){
                $consulta = "SELECT * FROM productos";
            }else{
                $consulta = "SELECT * FROM productos where productos_pk='$id'";
            }
           
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            $data=$resultado->fetchAll(PDO::FETCH_ASSOC);//FetchAll lo que hace es devolvernos un array con todo el conjunto de resultados
        break;
        case 5://para restarle cantidad a un producto
            //UPDATE productos SET prod_cantidad = (prod_cantidad - 1) WHERE productos_pk = 29
            if($Dec_sum_res==0){
            $consulta = "UPDATE productos SET prod_cantidad = (prod_cantidad - '$cantidad_producto') WHERE prod_nombre = '$nombre_producto'";
            }else{
                $consulta = "UPDATE productos SET prod_cantidad = (prod_cantidad + '$cantidad_producto') WHERE prod_nombre = '$nombre_producto'";
            }
              $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
        case 6: //Al eliminar una factura y su registro en detalles
            $consulta = "DELETE FROM productos where productos_pk='$id';";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
        break;
        case 7: //Al editar una producto
            $consulta = " UPDATE productos
            SET    
            
            prod_hist_cant = CASE
                     WHEN prod_cantidad > '$cantidad_producto' THEN (prod_hist_cant - (prod_cantidad -'$cantidad_producto'))
                     WHEN prod_cantidad < '$cantidad_producto'  THEN ('$cantidad_producto' - prod_cantidad ) + prod_hist_cant
                    ELSE prod_hist_cant
                   END,
            prod_nombre='$nombre_producto', prod_cantidad='$cantidad_producto', prod_precio='$precio_producto'
           WHERE productos_pk='$id'";
        //     UPDATE productos
        //     SET    prod_hist_cant = CASE
        //              WHEN prod_cantidad > '$cantidad_producto' OR prod_cantidad = '$cantidad_producto' THEN prod_hist_cant + 1
        //              WHEN prod_cantidad < '$cantidad_producto'  THEN prod_hist_cant-1
        //              ELSE prod_hist_cant
        //            END
        //    WHERE productos_pk='$id'
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE);
$conexion = null; //Cerramos la conexion
?>