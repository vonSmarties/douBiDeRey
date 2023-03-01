<?php
include_once 'class/MemberManager.php';

$memberManager = new MemberManager();

$members = $memberManager->readAll();
$data = [];
if ($members)
    foreach ($members as $member) {
        $data[] = $member->getJson();
    }
/** whatever is being serialized **/;
header('Content-Type: application/json');
echo json_encode($data);
