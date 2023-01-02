<?php
include_once 'class/MemberManager.php';
include_once 'class/Member.php';

$memberManager = new MemberManager();
$member = new Member();
session_start();

if ($_SESSION["magicalUnicornToken"] == $_POST['magicalUnicornToken']) {
    try {
        $target_path = "asset/board/";
        $ext = explode('.', basename($_FILES['file']['name']));
        $target_path = $target_path . md5(uniqid()) . "." . $ext[count($ext) - 1];

        move_uploaded_file($_FILES['file']['tmp_name'], "../" . $target_path);
        $member->setPicture($target_path);
        if ($memberManager->update($member)) {
            header('Content-Type: application/json');
            echo json_encode([
                "create" => "true",
                "file" => $member->getPicture()
            ]);
        }
    } catch (Exception $ex) {
        header('Content-Type: application/json');
        echo json_encode([
            "create" => "false"
        ]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode([
        "unicorn" => "true"
    ]);
}
