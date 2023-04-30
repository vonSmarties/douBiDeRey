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
header('Access-Control-Allow-Origin: https://www.marcheurs-dou-bi-de-rey.fr/api/galleryAll.php');
echo json_encode($data);
