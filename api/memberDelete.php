<?php
include_once 'class/MemberManager.php';
include_once 'class/RequestHandler.php';

$data = $requestHandler->privateRequest();
$member = $memberManager->read($data->id);

try {
    if ($memberManager->deleteMember($member)) {
        $requestHandler->jsonResponse(["delete" => true]);
    }
} catch (Exception $ex) {
    $requestHandler->jsonResponse([
        "delete" => false
    ]);
}
