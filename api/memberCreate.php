<?php
include_once 'class/MemberManager.php';
include_once 'class/Member.php';
include_once 'class/RequestHandler.php';

$data = $requestHandler->privateRequest();
$member = new Member();
$member->fill($data);
session_start();

try {
    if ($memberManager->create($member)) {
        $requestHandler->jsonResponse([
            "create" => true,
            "id" => $member->getId()
        ]);
    }
} catch (Exception $ex) {
    $requestHandler->jsonResponse([
        "create" => false
    ]);
}
