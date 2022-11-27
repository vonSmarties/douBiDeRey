<?php

require('functions.php');

$data = json_decode(file_get_contents('php://input'));
$galleryManager = new GalleryManager();
$gallery = $galleryManager->read($id);
try {
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