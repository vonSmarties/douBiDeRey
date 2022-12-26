<?php
include_once 'class/GalleryManager.php';

$galleryManager = new GalleryManager();

$gallery = $galleryManager->readLast();

 /** whatever is being serialized **/; 
header('Content-Type: application/json'); 
echo json_encode($gallery->getJson());