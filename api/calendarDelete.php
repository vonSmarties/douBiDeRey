<?php

require('functions.php');

$data = json_decode(file_get_contents('php://input'));
$calendarManager = new CalendarManager();
$calendar = $calendarManager->read($id);
try {
    $calendarManager->delete($calendar);
    header('Content-Type: application/json');
    echo json_encode(["delete" => "true"]);
} catch (Exception $ex) {
    header('Content-Type: application/json');
    echo json_encode([
        "delete" => "false",
        "exception" => $ex
    ]);
}