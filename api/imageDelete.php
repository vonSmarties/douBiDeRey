<?php
include 'class/ImageManager.php';

$data = json_decode(file_get_contents('php://input'));
$imageManager = new ImageManager();
$image = $imageManager->read($data->file);
try {
    $imageManager->deleteImage($image);
    header('Content-Type: application/json');
    echo json_encode(["delete" => "true"]);
} catch (Exception $ex) {
    header('Content-Type: application/json');
    echo json_encode([
        "delete" => "false",
        "exception" => $ex
    ]);
}