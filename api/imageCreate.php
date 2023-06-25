<?php
include_once 'class/ImageManager.php';
include_once 'class/Image.php';
include_once 'class/RequestHandler.php';

$requestHandler->privateFormData();

$image = new Image();

try {
    $target_path = "gallery/" . $_POST['idGallery'] . "/";
    $ext = explode('.', basename($_FILES['file']['name']));
    $target_path = $target_path . md5(uniqid()) . "." . $ext[count($ext) - 1];

    move_uploaded_file($_FILES['file']['tmp_name'], "../" . $target_path);
    $image->setGallery($_POST['idGallery']);
    $image->setFile($target_path);
    if ($imageManager->create($image)) {
        $requestHandler->jsonResponse([
            "create" => true,
            "file" => $image->getFile()
        ]);
    }
} catch (Exception $ex) {
    $requestHandler->jsonResponse([
        "create" => false,
        "exception" => $ex
    ]);
}
