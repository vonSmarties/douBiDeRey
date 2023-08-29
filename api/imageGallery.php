<?php
include_once 'class/ImageManager.php';
include_once 'class/RequestHandler.php';

$gallery = $requestHandler->privateRequest();

$images = $imageManager->readAllGallery($gallery->id);
$data = [];
if (isset($images))
    foreach ($images as $image) {
        $data[] = $image->getJson();
    }
/** whatever is being serialized **/;
$requestHandler->jsonResponse($data);
