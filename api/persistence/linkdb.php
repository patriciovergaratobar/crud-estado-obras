<?php

//$link = mysql_connect('localhost', 'mmoya_holter1', 'vergara16')
  //  or die('No se pudo conectar: ' . mysql_error());
//echo 'Connected successfully';
//mysql_select_db('mmoya_holter1') or die('No se pudo seleccionar la base de datos');

function getConnect() {
    // Conectando, seleccionando la base de datos
    $link = mysqli_connect('localhost:3306', 'root', 'root12345', 'estado_obras');
    $link->set_charset('utf8');
    return $link;
}
/*
function getConnect() {
    // Conectando, seleccionando la base de datos
    // tupeluqu_web
    $link = mysqli_connect("127.0.0.1", "_web", "estado_obras123", "estado_obras");
    $link->set_charset('utf8');
    return $link;
}*/



function basicColumUser() {
    $colums = "rut, email, password, createtime, nombre, apellido, tipoPerfil, activo, token, empresaId";
    return $colums;
}


?>
