<?php
include_once 'class/MemberManager.php';
include_once 'class/Member.php';
include_once 'class/RequestHandler.php';

$requestHandler->privateFormData();

try {
    $member = $memberManager->read($_POST['memberId']);
    $target_path = "asset/board/";
    $ext = explode('.', basename($_FILES['file']['name']));
    $target_path = $target_path . md5(uniqid()) . "." . $ext[count($ext) - 1];

    move_uploaded_file($_FILES['file']['tmp_name'], "../" . $target_path);
    unlink('../' . $member->getPicture());
    $member->setPicture($target_path);
    if ($memberManager->update($member)) {
        $requestHandler->jsonResponse([
            "update" => true,
            "file" => $member->getPicture()
        ]);
    }
} catch (Exception $ex) {
    $requestHandler->jsonResponse([
        "update" => false
    ]);
}
