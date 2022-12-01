<?php

require('functions.php');

$data = json_decode(file_get_contents('php://input'));
$calendarManager = new CalendarManager();
$calendar = $calendarManager->read($data->id);
$calendar->fill($data);
try {
    $calendarManager->update($calendar);
    header('Content-Type: application/json');
    echo json_encode(["update" => "true"]);
} catch (Exception $ex) {
    header('Content-Type: application/json');
    echo json_encode([
        "update" => "false",
        "exception" => $ex
    ]);
}

/** whatever is being serialized **/;
