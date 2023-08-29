<?php
include_once 'class/CalendarManager.php';
include_once 'class/RequestHandler.php';

$data = $requestHandler->publicRequest();

if (isset($data->year))
    $calendar = $calendarManager->readYear($data->year);
$data = [];
if (isset($calendar))
    foreach ($calendar as $item) {
        $data[] = $item->getJson();
    }

$requestHandler->jsonResponse($data);
