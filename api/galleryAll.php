<?php
include_once 'class/GalleryManager.php';

$galleryManager = new GalleryManager();

$galleries = $galleryManager->readAll();
$data = [];
if ($galleries)
foreach ($galleries as $gallery) {
    $data[] = $gallery->getJson();
}

header('Content-Type: application/json');
echo json_encode($data);
