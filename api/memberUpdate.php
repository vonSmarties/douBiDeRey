<?php
include_once 'class/MemberManager.php';
include_once 'class/RequestHandler.php';

$data = $requestHandler->privateRequest();
$memberManager = new MemberManager();
$member = $memberManager->read($data->id);
$member->fill($data);
session_start();

if ($_SESSION["magicalUnicornToken"] == $data->magicalUnicornToken) {
    try {
        if ($memberManager->update($member)) {
            header('Content-Type: application/json');
            echo json_encode(["update" => true]);
        }
    } catch (Exception $ex) {
        header('Content-Type: application/json');
        echo json_encode([
            "update" => false
        ]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode([
        "unicorn" => true
    ]);
}
