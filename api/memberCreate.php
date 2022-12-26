<?php
include_once 'class/MemberManagers.php';
include_once 'class/Member.php';

$data = json_decode(file_get_contents('php://input'));
$memberManager = new MemberManager();
$member = new Member();
$member->fill($data);
try {
    $memberManager->create($member);
    header('Content-Type: application/json');
    echo json_encode(["create" => "true"]);
} catch (Exception $ex) {
    header('Content-Type: application/json');
    echo json_encode([
        "create" => "false",
        "exception" => $ex
    ]);
}