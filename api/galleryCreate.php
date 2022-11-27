<?php

require('functions.php');

$data = json_decode(file_get_contents('php://input'));
$galleryManager = new GalleryManager();
$gallery = new Gallery();
$gallery->fill($data);
try {
    $galleryManager->create($gallery);
    header('Content-Type: application/json');
    echo json_encode(["create" => "true"]);
} catch (Exception $ex) {
    header('Content-Type: application/json');
    echo json_encode([
        "create" => "false",
        "exception" => $ex
    ]);
}
