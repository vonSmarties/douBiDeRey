<?php
include_once 'class/CalendarManager.php';

$data = json_decode(file_get_contents('php://input'));
$calendarManager = new CalendarManager();

if ($data->year)
    $calendar = $calendarManager->readYear($data->year);
$data = [];
if ($calendar)
    foreach ($calendar as $item) {
        $data[] = $item->getJson();
    }

header('Content-Type: application/json');
echo json_encode($data);
