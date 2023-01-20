<?php
include_once 'class/GalleryManager.php';

$data = json_decode(file_get_contents('php://input'));
$galleryManager = new GalleryManager();
$gallery = $galleryManager->read($data->id);
$gallery->fill($data);
session_start();

if ($_SESSION["magicalUnicornToken"] == $data->magicalUnicornToken) {
    try {
        if ($galleryManager->update($gallery)) {
            header('Content-Type: application/json');
            echo json_encode(["update" => true]);
        }
    } catch (Exception $ex) {
        header('Content-Type: application/json');
        echo json_encode([
            "update" => false,
            "exception" => $ex
        ]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode([
        "unicorn" => true
    ]);
}
