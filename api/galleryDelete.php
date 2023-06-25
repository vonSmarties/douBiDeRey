<?php
include_once 'class/GalleryManager.php';
include_once 'class/ImageManager.php';
include_once 'class/RequestHandler.php';

$data = $requestHandler->privateRequest();
$gallery = $galleryManager->read($data->id);
try {
    if ($imageManager->deleteImagesGallery($gallery) && $galleryManager->delete($gallery)) {
        $requestHandler->jsonResponse(["delete" => true]);
    }
} catch (Exception $ex) {
    $requestHandler->jsonResponse([
        "delete" => false,
        "exception" => $ex
    ]);
}
