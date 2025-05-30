<?php
include_once 'class/AttachManager.php';
include_once 'class/RequestHandler.php';

$info = $requestHandler->publicRequest();

$attachs = $attachManager->readAllInfo($info->id);
$data = [];
if (isset($attachs))
    foreach ($attachs as $attach) {
        $data[] = $attach->getJson();
    }
/** whatever is being serialized **/;
$requestHandler->jsonResponse($data);
