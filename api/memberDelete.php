<?php
include_once 'class/MemberManager.php';

$data = json_decode(file_get_contents('php://input'));
$memberManager = new MemberManager();
$member = $memberManager->read($data->id);
session_start();

if ($_SESSION["magicalUnicornToken"] == $data->magicalUnicornToken) {
    try {
        if ($memberManager->deleteMember($member)) {
            header('Content-Type: application/json');
            echo json_encode(["delete" => "true"]);
        }
    } catch (Exception $ex) {
        header('Content-Type: application/json');
        echo json_encode([
            "delete" => "false"
        ]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode([
        "unicorn" => "true"
    ]);
}
