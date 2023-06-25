<?php
include_once 'class/GalleryManager.php';
include_once 'class/RequestHandler.php';

$gallery = $galleryManager->readLast();

 /** whatever is being serialized **/; 
 $requestHandler->jsonResponse($gallery->getJson());