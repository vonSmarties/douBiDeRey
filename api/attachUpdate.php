<?php
include_once 'class/AttachManager.php';
include_once 'class/RequestHandler.php';

$data = $requestHandler->privateRequest();
$attach = $attachManager->read($data->file);
$attach->setTitle($data->title);

try {
    if ($attachManager->update($attach)) {
        $requestHandler->jsonResponse(["update" => true]);
    }
} catch (Exception $ex) {
    $requestHandler->jsonResponse([
        "update" => false
    ]);
}