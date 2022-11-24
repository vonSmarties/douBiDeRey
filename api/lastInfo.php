<?php

require('functions.php');

$infoManager = new InfoManager();

$info = $infoManager->readLast();

 /** whatever is being serialized **/; 
header('Content-Type: application/json'); 
echo json_encode($info->getJson());