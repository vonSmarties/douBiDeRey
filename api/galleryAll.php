<?php

require('functions.php');

$galleryManager = new GalleryManager();

$galleries = $galleryManager->readAll();
$data = [];
foreach ($galleries as $gallery) {
    $data[] = $gallery->getJson();
}

header('Content-Type: application/json');
echo json_encode($data);
