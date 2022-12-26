<?php
include 'class/InfoManager.php';

$infoManager = new InfoManager();

$infos = $infoManager->readAll();
$data = [];
foreach ($infos as $info) {
    $data[] = $info->getJson();
}
/** whatever is being serialized **/;
header('Content-Type: application/json');
echo json_encode($data);
