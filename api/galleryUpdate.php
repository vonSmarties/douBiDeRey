<?php
include 'class/GalleryManager.php';

$data = json_decode(file_get_contents('php://input'));
$galleryManager = new GalleryManager();
$gallery = $galleryManager->read($data->id);
$gallery->fill($data);
try {
    $galleryManager->update($gallery);
    header('Content-Type: application/json');
    echo json_encode(["update" => "true"]);
} catch (Exception $ex) {
    header('Content-Type: application/json');
    echo json_encode([
        "update" => "false",
        "exception" => $ex
    ]);
}
