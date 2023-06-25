<?php
include_once 'class/InfoManager.php';
include_once 'class/RequestHandler.php';

$data = $requestHandler->privateRequest();
$infoManager = new InfoManager();
$info = $infoManager->read($data->id);

try {
    if ($infoManager->delete($info)) {
        $requestHandler->jsonResponse(["delete" => true]);
    }
} catch (Exception $ex) {
    $requestHandler->jsonResponse([
        "delete" => false,
        "exception" => $ex
    ]);
}
