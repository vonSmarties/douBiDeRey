<?php
include_once 'class/ImageManager.php';
include_once 'class/GalleryManager.php';
include_once 'class/RequestHandler.php';

$data = $requestHandler->privateRequest();
$image = $imageManager->read($data->file);
try {
    if ($imageManager->deleteImage($image)) {
        $images = $imageManager->readAllGallery($image->getGallery());
        $gallery = $galleryManager->read($image->getGallery());
        if ($gallery->zipImages($images))
            $requestHandler->jsonResponse(["delete" => true]);
    }
} catch (Exception $ex) {
    $requestHandler->jsonResponse([
        "delete" => false,
        "exception" => $ex
    ]);
}
