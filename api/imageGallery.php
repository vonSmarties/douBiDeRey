<?php

require('functions.php');

$post = json_decode(file_get_contents('php://input'));

$imageManager = new ImageManager();
$images = $imageManager->readAllGallery($post->gallery->id);
foreach ($images as $image) {
    $data[] = $image->getJson();
}
 /** whatever is being serialized **/; 
header('Content-Type: application/json'); 
echo json_encode($data);
