<?php
include_once 'class/MemberManager.php';

$data = json_decode(file_get_contents('php://input'));
$memberManager = new MemberManager();
$member = $memberManager->read($data->id);
try {
    $memberManager->delete($member);
    header('Content-Type: application/json');
    echo json_encode(["delete" => "true"]);
} catch (Exception $ex) {
    header('Content-Type: application/json');
    echo json_encode([
        "delete" => "false",
        "exception" => $ex
    ]);
}