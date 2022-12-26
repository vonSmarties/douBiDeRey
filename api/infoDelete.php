<?php
include_once 'class/InfoManager.php';

$data = json_decode(file_get_contents('php://input'));
$infoManager = new InfoManager();
$info = $infoManager->read($data->id);
try {
    $infoManager->delete($info);
    header('Content-Type: application/json');
    echo json_encode(["delete" => "true"]);
} catch (Exception $ex) {
    header('Content-Type: application/json');
    echo json_encode([
        "delete" => "false",
        "exception" => $ex
    ]);
}