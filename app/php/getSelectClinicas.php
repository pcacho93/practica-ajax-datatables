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
/* Consulta SELECT */
$query = "SELECT id, nombre FROM clinicas";
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
    while ($fila = mysql_fetch_assoc($query_res)) {
        echo '<option id="' . $fila['id'] . '" value="' . $fila['id'] . '">' . $fila['nombre'] . '</option>';
    }
}
?>
