<?php

require('functions.php');

$data = json_decode(file_get_contents('php://input'));
$galleryManager = new GalleryManager();
$imageManager = new ImageManager();
$gallery = $galleryManager->read($data->id);
try {
    $imageManager->deleteImagesGallery($gallery);
    $galleryManager->delete($gallery);
    header('Content-Type: application/json');
    echo json_encode(["delete" => "true"]);
} catch (Exception $ex) {
    header('Content-Type: application/json');
    echo json_encode([
        "delete" => "false",
        "exception" => $ex
    ]);
}