<?php
include_once 'class/InfoManager.php';
include_once 'class/RequestHandler.php';

$info = $infoManager->readLast();
 /** whatever is being serialized **/; 
    $requestHandler->jsonResponse($info->getJson());