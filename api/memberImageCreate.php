<?php
include_once 'class/MemberManager.php';
include_once 'class/Member.php';
include_once 'class/RequestHandler.php';

$requestHandler->privateFormData();
$member = new Member();

    try {
        $target_path = "asset/board/";
        $ext = explode('.', basename($_FILES['file']['name']));
        $target_path = $target_path . md5(uniqid()) . "." . $ext[count($ext) - 1];

        move_uploaded_file($_FILES['file']['tmp_name'], "../" . $target_path);
        $member->setPicture($target_path);
        if ($memberManager->update($member)) {
            $requestHandler->jsonResponse([
                "create" => true,
                "file" => $member->getPicture()
            ]);
        }
    } catch (Exception $ex) {
        $requestHandler->jsonResponse([
            "create" => false
        ]);
    }
