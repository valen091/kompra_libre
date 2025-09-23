<?php
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'conectar.php';

header('Content-Type: application/json');

$categoria = isset($_GET['categoria']) ? strtolower(trim($_GET['categoria'])) : '';

$sql = "SELECT * FROM productos";
if ($categoria !== '') {
    
    $categoria = $conexion->real_escape_string($categoria);
    $sql .= " WHERE LOWER(categoria) = '$categoria'";
}

$resultado = $conexion->query($sql);

$productos = array();

if ($resultado) {
    while ($fila = $resultado->fetch_assoc()) {
        $productos[] = $fila;
    }
    $resultado->free();
}

echo json_encode($productos);

$conexion->close();
?>
