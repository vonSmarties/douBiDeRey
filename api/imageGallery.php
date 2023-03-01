<?php
include_once 'class/ImageManager.php';

$gallery = json_decode(file_get_contents('php://input'));

$imageManager = new ImageManager();
$images = $imageManager->readAllGallery($gallery->id);
$data = [];
if ($images)
    foreach ($images as $image) {
        $data[] = $image->getJson();
    }
/** whatever is being serialized **/;
header('Content-Type: application/json');
echo json_encode($data);
