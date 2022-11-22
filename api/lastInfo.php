<?php

require('functions.php');

$htmlManager = new InfoManager();

$html = $htmlManager->read(1)->getHtml();

 /** whatever is being serialized **/; 
header('Content-Type: application/json'); 
echo json_encode(['html' => $html]);