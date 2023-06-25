<?php
include_once 'class/GalleryManager.php';
include_once 'class/RequestHandler.php';

$data = $requestHandler->privateRequest();
$gallery = $galleryManager->read($data->id);
$gallery->fill($data);
try {
    if ($galleryManager->update($gallery)) {
        $requestHandler->jsonResponse(["update" => true]);
    }
} catch (Exception $ex) {
    $requestHandler->jsonResponse([
        "update" => false,
        "exception" => $ex
    ]);
}
