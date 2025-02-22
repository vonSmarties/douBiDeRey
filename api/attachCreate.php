<?php
include_once 'class/AttachManager.php';
include_once 'class/Attach.php';
include_once 'class/RequestHandler.php';

$requestHandler->privateFormData();

$attach = new Attach();

try {
    $target_path = "attach/" . $_POST['idInfo'] . "/";
    $ext = explode('.', basename($_FILES['file']['name']));
    $target_path = $target_path . md5(uniqid()) . "." . $ext[count($ext) - 1];

    move_uploaded_file($_FILES['file']['tmp_name'], "../" . $target_path);
    $attach->setInfo($_POST['idInfo']);
    $attach->setTitle($_POST['title']);
    $attach->setFile($target_path);
    if ($attachManager->create($attach)) {
        $requestHandler->jsonResponse([
            "create" => true,
            "file" => $attach->getFile()
        ]);
    }
} catch (Exception $ex) {
    $requestHandler->jsonResponse([
        "create" => false,
        "exception" => $ex
    ]);
}
