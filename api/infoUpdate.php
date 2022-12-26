<?php
include_once 'class/InfoManager.php';

$data = json_decode(file_get_contents('php://input'));
$infoManager = new InfoManager();
$info = $infoManager->read($data->id);
$info->setDelta($data->delta);
try {
    $infoManager->update($info);
    header('Content-Type: application/json');
    echo json_encode(["update" => "true"]);
} catch (Exception $ex) {
    header('Content-Type: application/json');
    echo json_encode([
        "update" => "false",
        "exception" => $ex
    ]);
}

/** whatever is being serialized **/;
