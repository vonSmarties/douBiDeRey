<?php
include_once 'class/MemberManager.php';
include_once 'class/RequestHandler.php';

$members = $memberManager->readAll();
$data = [];
if ($members)
    foreach ($members as $member) {
        $data[] = $member->getJson();
    }
/** whatever is being serialized **/;
$requestHandler->jsonResponse($data);
