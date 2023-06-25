<?php
include_once 'class/CalendarManager.php';
include_once 'class/RequestHandler.php';

$data = $requestHandler->publicRequest();

if ($data->year)
    $calendar = $calendarManager->readYear($data->year);
$data = [];
if ($calendar)
    foreach ($calendar as $item) {
        $data[] = $item->getJson();
    }

$requestHandler->jsonResponse($data);
