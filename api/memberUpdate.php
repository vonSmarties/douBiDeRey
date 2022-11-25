<?php

require('functions.php');

$data = json_decode(file_get_contents('php://input'));
$memberManager = new MemberManager();
$member = $memberManager->read($data->id);
$member->fill($data);
try {
    $memberManager->update($member);
    header('Content-Type: application/json');
    echo json_encode(["update" => "true"]);
} catch (Exception $ex) {
    echo $ex;
}

/** whatever is being serialized **/;
