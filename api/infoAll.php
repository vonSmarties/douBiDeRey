<?php
include_once 'class/InfoManager.php';
include_once 'class/RequestHandler.php';

$infos = $infoManager->readAll();
$data = [];
if (isset($infos))
    foreach ($infos as $info) {
        $data[] = $info->getJson();
    }
/** whatever is being serialized **/;
$requestHandler->jsonResponse($data);
