<?php
include_once 'class/AttachManager.php';
include_once 'class/RequestHandler.php';

$data = $requestHandler->privateRequest();
$attach = $attachManager->read($data->file);
try {
    if ($attachManager->deleteAttach($attach)) {
            $requestHandler->jsonResponse(["delete" => true]);
    }
} catch (Exception $ex) {
    $requestHandler->jsonResponse([
        "delete" => false,
        "exception" => $ex
    ]);
}
