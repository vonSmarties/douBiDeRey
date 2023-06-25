<?php
include_once 'class/GalleryManager.php';
include_once 'class/Gallery.php';
include_once 'class/RequestHandler.php';

$data = $requestHandler->privateRequest();
$gallery = new Gallery();
$gallery->fill($data);

try {
    if ($galleryManager->create($gallery)) {
        $requestHandler->jsonResponse([
            "create" => true,
            "id" => $gallery->getId()
        ]);
    }
} catch (Exception $ex) {
    $requestHandler->jsonResponse([
        "create" => false,
        "exception" => $ex
    ]);
}
