<?php
$conexion = new mysqli("localhost", "root", "", "kompra_libre");

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
?>
