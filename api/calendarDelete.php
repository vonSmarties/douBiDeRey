<?php
include_once 'class/CalendarManager.php';
include_once 'class/RequestHandler.php';

$data = $requestHandler->privateRequest();
$calendar = $calendarManager->read($data->id);

try {
    if ($calendarManager->delete($calendar)) {
        $requestHandler->jsonResponse(["delete" => true]);
    }
} catch (Exception $ex) {
    $requestHandler->jsonResponse([
        "delete" => false,
        "exception" => $ex
    ]);
}
