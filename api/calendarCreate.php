<?php
include_once 'class/CalendarManager.php';
include_once 'class/Calendar.php';
include_once 'class/RequestHandler.php';

$data = $requestHandler->privateRequest();
$calendar = new Calendar();
$calendar->fill($data);

try {
    if ($calendarManager->create($calendar)) {
        $requestHandler->jsonResponse([
            "create" => true,
            "id" => $calendar->getId()
        ]);
    }
} catch (Exception $ex) {
    $requestHandler->jsonResponse([
        "create" => false,
        "exception" => $ex
    ]);
}
