<?php
include_once 'class/ImageManager.php';
include_once 'class/GalleryManager.php';
include_once 'class/RequestHandler.php';

$gallery = $requestHandler->publicRequest();
$images = $imageManager->readAllGallery($gallery->id);
$gallery = $galleryManager->read($gallery->id);
$tmp_file = tempnam('../attach', '');
$zip = new ZipArchive();
$zip->open($tmp_file, ZipArchive::CREATE);
$galerieName = str_replace('/', '_', $gallery->getTitle());
foreach ($images as $key => $image) {
    $zip->addFromString(
        basename($galerieName . '_' . $key . '.' . array_pop(explode('.', $image->getFile()))),
        file_get_contents('../' . $image->getFile())
    );
}
$zip->close();
$zipFile = $galerieName . '.zip';
copy($tmp_file, '../attach/' . $zipFile);
$requestHandler->jsonResponse(["dir" => 'attach/'.$zipFile]);
unlink($tmp_file);
