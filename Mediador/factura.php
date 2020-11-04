<?php
//se reciben los datos y se trata su estructura

//Necesario para recibir parametros con Axios
$_POST = json_decode(file_get_contents("php://input"),true);

$array= (isset($_POST['Valor'])) ? $_POST['Valor'] : '';//se recibe el array 
$nombre= (isset($_POST['Nombre'])) ? $_POST['Nombre'] : '';
$fecha= (isset($_POST['Fecha'])) ? $_POST['Fecha'] : '';
$subtotal= (isset($_POST['Subtotal'])) ? $_POST['Subtotal'] : '';
$total= (isset($_POST['Total'])) ? $_POST['Total'] : '';
$id= (isset($_POST['ID'])) ? $_POST['ID'] : '';//se recibe el ultimo id de la tabla factura
$id=$id+1;//se le suma uno para el futuro registro en la tabla detallesfacturas
$array_string=implode(" ",$array);//Se convierte el array en un string (cadena de caracteres)
$array_with_ID=str_replace('ID',$id,$array_string);//se reemplaza el id en la cadena por el nuevo

//comprobamos de nuevo que algun dato no este vacio o erroneo
$est_dat;
if($subtotal==0||$total==0){
    $est_dat='ERROR';
}else{
$est_dat = "START TRANSACTION;
INSERT INTO facturas(fact_nombre,fact_fecha,fact_subtotal,fact_iva,fact_total) VALUES ('$nombre','$fecha','$subtotal',0,'$total');
$array_with_ID
COMMIT;";//estructura de los datos que se mandaran en la transaccion
//muy importante ya que podría afectar a la funcionalidad completamente
}
print json_encode($est_dat);
?>  