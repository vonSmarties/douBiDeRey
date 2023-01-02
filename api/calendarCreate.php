<?php
include_once 'class/CalendarManager.php';
include_once 'class/Calendar.php';

$data = json_decode(file_get_contents('php://input'));
$calendarManager = new CalendarManager();
$calendar = new Calendar();
$calendar->fill($data);
session_start();
if ($_SESSION["magicalUnicornToken"] == $data->magicalUnicornToken) {
    try {
        if ($calendarManager->create($calendar)) {
            header('Content-Type: application/json');
            echo json_encode([
                "create" => "true",
                "id" => $calendar->getId()
            ]);
        }
    } catch (Exception $ex) {
        header('Content-Type: application/json');
        echo json_encode([
            "create" => "false",
            "exception" => $ex
        ]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode([
        "unicorn" => "true"
    ]);
}
