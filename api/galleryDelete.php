<?php
include_once 'class/GalleryManager.php';
include_once 'class/ImageManager.php';

$data = json_decode(file_get_contents('php://input'));
$galleryManager = new GalleryManager();
$imageManager = new ImageManager();
$gallery = $galleryManager->read($data->id);
session_start();

if ($_SESSION["magicalUnicornToken"] == $data->magicalUnicornToken) {
    try {
        if ($imageManager->deleteImagesGallery($gallery) && $galleryManager->delete($gallery)) {
            header('Content-Type: application/json');
            echo json_encode(["delete" => "true"]);
        }
    } catch (Exception $ex) {
        header('Content-Type: application/json');
        echo json_encode([
            "delete" => "false",
            "exception" => $ex
        ]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode([
        "unicorn" => "true"
    ]);
}
