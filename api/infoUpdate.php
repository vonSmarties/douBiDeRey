<?php

require('functions.php');

$data = json_decode(file_get_contents('php://input'));
$infoManager = new InfoManager();
$info = $infoManager->read($data->id);
$info->setHtml($data->html);
try {
    $infoManager->update($info);
    header('Content-Type: application/json');
    echo json_encode(["update" => "true"]);
} catch (Exception $ex) {
    header('Content-Type: application/json');
    echo json_encode(["update" => "false"]);
}

/** whatever is being serialized **/;
