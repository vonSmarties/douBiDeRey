<?php
include_once 'class/MemberManager.php';
include_once 'class/Member.php';

$data = json_decode(file_get_contents('php://input'));
$memberManager = new MemberManager();
$member = new Member();
$member->fill($data);
session_start();

if ($_SESSION["magicalUnicornToken"] == $data->magicalUnicornToken) {
    try {
        if ($memberManager->create($member)) {
            header('Content-Type: application/json');
            echo json_encode([
                "create" => true,
                "id" => $member->getId()
            ]);
        }
    } catch (Exception $ex) {
        header('Content-Type: application/json');
        echo json_encode([
            "create" => false
        ]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode([
        "unicorn" => true
    ]);
}
