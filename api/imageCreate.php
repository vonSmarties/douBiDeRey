<?php
include_once 'class/ImageManager.php';
include_once 'class/Image.php';

$imageManager = new ImageManager();
$image = new Image();
session_start();

if ($_SESSION["magicalUnicornToken"] == $_POST['magicalUnicornToken']) {
    try {
        $target_path = "gallery/" . $_POST['idGallery'] . "/";
        $ext = explode('.', basename($_FILES['file']['name']));
        $target_path = $target_path . md5(uniqid()) . "." . $ext[count($ext) - 1];

        move_uploaded_file($_FILES['file']['tmp_name'], "../" . $target_path);
        $image->setGallery($_POST['idGallery']);
        $image->setFile($target_path);
        if ($imageManager->create($image)) {
            header('Content-Type: application/json');
            echo json_encode([
                "create" => true,
                "file" => $image->getFile()
            ]);
        }
    } catch (Exception $ex) {
        header('Content-Type: application/json');
        echo json_encode([
            "create" => false,
            "exception" => $ex
        ]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode([
        "unicorn" => true
    ]);
}
