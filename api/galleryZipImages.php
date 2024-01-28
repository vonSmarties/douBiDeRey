<?php
include_once 'class/GalleryManager.php';
include_once 'class/ImageManager.php';
include_once 'class/RequestHandler.php';

$data = $requestHandler->privateRequest();
$gallery = $galleryManager->read($data->id);
$images = $imageManager->readAllGallery($data->id);
try {
    if ($gallery->zipImages($images)) {
        $requestHandler->jsonResponse(["zipped" => true]);
    }
} catch (Exception $ex) {
    $requestHandler->jsonResponse([
        "zipped" => false,
        "exception" => $ex
    ]);
}
