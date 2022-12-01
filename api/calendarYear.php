<?php

require('functions.php');

$data = json_decode(file_get_contents('php://input'));
$calendarManager = new CalendarManager();

$calendar = $calendarManager->readYear($data->id);
foreach ($calendar as $item) {
    $data[] = $item->getJson();
}

header('Content-Type: application/json');
echo json_encode($data);
