<?php
include_once 'class/ImageManager.php';
include_once 'class/GalleryManager.php';
include_once 'class/RequestHandler.php';

$gallery = $requestHandler->publicRequest();
$images = $imageManager->readAllGallery($gallery->id);
$gallery = $galleryManager->read($gallery->id);
$tmp_file = tempnam('.', '');
$zip = new ZipArchive();
$zip->open($tmp_file, ZipArchive::CREATE);
foreach ($images as $image) {
    $zip->addFromString(
        basename($image->getFile()),
        file_get_contents('../'.$image->getFile())
    );
}
$zip->close();
$requestHandler->zipResponse($tmp_file);
unlink($tmp_file);