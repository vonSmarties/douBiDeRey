<?php
include_once 'class/MemberManager.php';
include_once 'class/RequestHandler.php';

$data = $requestHandler->privateRequest();

try {
    $update = true;
    foreach ($data->members as $datum) {
        $member = $memberManager->read($datum->id);
        $member->fill($datum);
        if (!$memberManager->update($member)) {
            $update = false;
        }
    }
    if ($update) {
        $requestHandler->jsonResponse(["update" => true]);
    }
} catch (Exception $ex) {
    $requestHandler->jsonResponse([
        "update" => false
    ]);
}
