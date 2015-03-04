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
//$_REQUEST['id'] = 1;
$numColegiado = $_REQUEST['nColegiado'];
$nombre = $_REQUEST['nombre'];
$clinicas = $_REQUEST['clinicas'];
/*
* SQL queries
* Get data to display
*/
$query = "INSERT INTO `doctores`(`numColegiado`,`nombre`) VALUES ('$numColegiado','$nombre')";
$query_res = mysql_query($query);
// Comprobar el resultado
if (!$query_res) {
if (mysql_errno() == 1062) {
$mensaje = "Imposible añadir el doctor. Ya existe un doctor con el mismo numero de colegiado.";
$estado = mysql_errno();
} else {
$mensaje = 'Error en la consulta: ' . mysql_error() . "\n";
$estado = mysql_errno();
}
} else {
foreach ($clinicas as $key => $value) {
    $query = "INSERT INTO 'vDoctores'('numcolegiado','clinica') VALUES ('$numColegiado','$value')";
    $query_res = mysql_query($query);
    if (!$query_res) { 
        $mensaje = 'Error en la consulta: ' . mysql_error() . "\n";
        $estado = mysql_errno();
    } else {
        $estado = 0;
        $mensaje = 'Doctor insertado correctamente';
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