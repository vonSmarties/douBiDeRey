<?php
include_once 'class/GalleryManager.php';
include_once 'class/RequestHandler.php';

$galleries = $galleryManager->readAll();
$data = [];
if (isset($galleries))
foreach ($galleries as $gallery) {
    $data[] = $gallery->getJson();
}

$requestHandler->jsonResponse($data);