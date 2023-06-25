<?php
include_once 'class/CalendarManager.php';
include_once 'class/RequestHandler.php';

$data = $requestHandler->privateRequest();
$calendar = $calendarManager->read($data->id);
$calendar->fill($data);

try {
    if ($calendarManager->update($calendar)) {
        $requestHandler->jsonResponse(["update" => true]);
    }
} catch (Exception $ex) {
    $requestHandler->jsonResponse([
        "update" => false,
        "exception" => $ex
    ]);
}
