<?php
/* Database connection information */
include("mysql.php" );
/*
* Local functions
*/
function fatal_error($sErrorMessage = '') {
header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error');
die($sErrorMessage);
}
/*
* MySQL connection
*/
if (!$gaSql['link'] = mysql_pconnect($gaSql['server'], $gaSql['user'], $gaSql['password'])) {
fatal_error('Could not open connection to server');
}
if (!mysql_select_db($gaSql['db'], $gaSql['link'])) {
fatal_error('Could not select database ');
}
mysql_query('SET names utf8');
/*
* SQL queries
* Get data to display
*/
$refId = $_REQUEST['refId'];
$numColegiado = $_REQUEST['nColegiado'];
$nombre = $_REQUEST['nombre'];
$clinicas = $_REQUEST['clinicas'];
//UPDATE `doctores` SET `nColegiado`= 444,`nombre`='KUKU' WHERE `nColegiado` = 009;
/* Consulta UPDATE */
$query = "UPDATE 'doctores` SET 'numcolegiado'= $numColegiado,'nombre'='$nombre' WHERE 'numcolegiado' = $refId";
//mysql_query($query, $gaSql['link']) or fatal_error('MySQL Error: ' . mysql_errno());
/*En función del resultado correcto o no, mostraremos el mensaje que corresponda*/
$query_res = mysql_query($query);
// Comprobar el resultado
if (!$query_res) {
$mensaje = 'Error en la consulta: ' . mysql_error() . "\n";
$estado = mysql_errno();
}
else
{
$query = "delete from vDoctores where nColegiado='$numColegiado'";
$query_res = mysql_query($query);
foreach ($clinicas as $key => $value) {
    $query = "INSERT INTO 'vDoctores'('numcolegiado','clinica') VALUES ('$numColegiado','$value')";
    $query_res = mysql_query($query);
    if (!$query_res) { 
        $mensaje = 'Error en la consulta: ' . mysql_error() . "\n";
        $estado = mysql_errno();
    } else {
        $estado = 0;
        $mensaje = "Actualización correcta";
    }
}
}
$resultado = array();
$resultado[] = array(
'mensaje' => $mensaje,
'estado' => $estado
);
echo json_encode($resultado);
?>