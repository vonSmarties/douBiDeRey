<?php

require('functions.php');

$data = json_decode(file_get_contents('php://input'));
$infoManager = new InfoManager();
$info = $infoManager->read($id);
try {
    $infoManager->delete($info);
    header('Content-Type: application/json');
    echo json_encode(["create" => "true"]);
} catch (Exception $ex) {
    header('Content-Type: application/json');
    echo json_encode(["create" => "false"]);
}