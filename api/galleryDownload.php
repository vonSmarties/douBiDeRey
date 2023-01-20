<?php
include_once 'class/ImageManager.php';
include_once 'class/GalleryManager.php';

$gallery = json_decode(file_get_contents('php://input'));

$imageManager = new ImageManager();
$galleryManager = new GalleryManager();
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
header('Content-disposition: attachment; filename=Resumes.zip');
header('Content-type: application/zip');
readfile($tmp_file);
unlink($tmp_file);