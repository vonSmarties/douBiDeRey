<?php
include_once 'class/InfoManager.php';
include_once 'class/RequestHandler.php';

$data = $requestHandler->privateRequest();
$infoManager = new InfoManager();
$info = $infoManager->read($data->id);
$info->setDelta($data->delta);

try {
    if ($infoManager->update($info)) {
        $requestHandler->jsonResponse(["update" => true]);
    }
} catch (Exception $ex) {
    $requestHandler->jsonResponse([
        "update" => false
    ]);
}
