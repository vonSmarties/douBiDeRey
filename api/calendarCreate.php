<?php

require('functions.php');

$data = json_decode(file_get_contents('php://input'));
$calendarManager = new CalendarManager();
$calendar = new Calendar();
$calendar->fill($data);
try {
    $calendarManager->create($calendar);

    header('Content-Type: application/json');
    echo json_encode([
        "create" => "true",
        "id" => $calendar->getId()
    ]);
} catch (Exception $ex) {
    header('Content-Type: application/json');
    echo json_encode([
        "create" => "false",
        "exception" => $ex
    ]);
}
