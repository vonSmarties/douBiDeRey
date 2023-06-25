<?php
include_once 'class/InfoManager.php';
include_once 'class/Info.php';
include_once 'class/RequestHandler.php';

$data = $requestHandler->privateRequest();
$info = new Info();
$info->setDelta($data->delta);

try {
    if ($infoManager->create($info)) {
        $requestHandler->jsonResponse([
            "create" => true,
            "id" => $info->getId()
        ]);
    }
} catch (Exception $ex) {
    $requestHandler->jsonResponse([
        "create" => false,
        "exception" => $ex
    ]);
}
