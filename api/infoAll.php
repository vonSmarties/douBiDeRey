<?php

require('functions.php');

$infoManager = new InfoManager();

$infos = $infoManager->readAll();
foreach ($infos as $info) {
    $data[] = $info->getJson();
}
/** whatever is being serialized **/;
header('Content-Type: application/json');
echo json_encode($data);
