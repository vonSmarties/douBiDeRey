<?php
include_once 'class/CalendarManager.php';

$data = json_decode(file_get_contents('php://input'));
$calendarManager = new CalendarManager();
$calendar = $calendarManager->read($data->id);
session_start();

if ($_SESSION["magicalUnicornToken"] == $data->magicalUnicornToken) {
    try {
        if ($calendarManager->delete($calendar)) {
            header('Content-Type: application/json');
            echo json_encode(["delete" => true]);
        }
    } catch (Exception $ex) {
        header('Content-Type: application/json');
        echo json_encode([
            "delete" => false,
            "exception" => $ex
        ]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode([
        "unicorn" => true
    ]);
}
