<?php

require('functions.php');

$data = json_decode(file_get_contents('php://input'));
$infoManager = new InfoManager();
$info = new Info();
$info->setHtml($data->html);
try {
    $infoManager->create($info);
    header('Content-Type: application/json');
    echo json_encode(["create" => "true"]);
} catch (Exception $ex) {
    header('Content-Type: application/json');
    echo json_encode(["create" => "false"]);
}