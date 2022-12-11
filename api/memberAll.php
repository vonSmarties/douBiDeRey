<?php

require('functions.php');

$memberManager = new MemberManager();

$members = $memberManager->readAll();
$data = [];
foreach ($members as $member) {
    $data[] = $member->getJson();
}
/** whatever is being serialized **/;
header('Content-Type: application/json');
echo json_encode($data);
