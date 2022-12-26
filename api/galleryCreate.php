<?php
include_once 'class/GalleryManager.php';
include_once 'class/Gallery.php';

$data = json_decode(file_get_contents('php://input'));
$galleryManager = new GalleryManager();
$gallery = new Gallery();
$gallery->fill($data);
try {
    $galleryManager->create($gallery);

    mkdir("../gallery/".$gallery->getId());
    header('Content-Type: application/json');
    echo json_encode([
        "create" => "true",
        "id" => $gallery->getId()
    ]);
} catch (Exception $ex) {
    header('Content-Type: application/json');
    echo json_encode([
        "create" => "false",
        "exception" => $ex
    ]);
}
