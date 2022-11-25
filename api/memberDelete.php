<?php

require('functions.php');

$data = json_decode(file_get_contents('php://input'));
$memberManager = new MemberManager();
$member = $memberManager->read($id);
try {
    $memberManager->delete($member);
    header('Content-Type: application/json');
    echo json_encode(["create" => "true"]);
} catch (Exception $ex) {
    header('Content-Type: application/json');
    echo json_encode(["create" => "false"]);
}