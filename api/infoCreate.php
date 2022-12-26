<?php
include_once 'class/InfoManager.php';
include_once 'class/Info.php';

$data = json_decode(file_get_contents('php://input'));
$infoManager = new InfoManager();
$info = new Info();
$info->setDelta($data->delta);
try {
    $infoManager->create($info);
    header('Content-Type: application/json');
    echo json_encode([
        "create" => "true",
        "id" => $info->getId()
    ]);
} catch (Exception $ex) {
    header('Content-Type: application/json');
    echo json_encode([
        "create" => "false",
        "exception" => $ex
    ]);
}
