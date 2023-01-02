<?php
include_once 'class/CalendarManager.php';

$calendarManager = new CalendarManager();

$list = $calendarManager->readListYear();
header('Content-Type: application/json');
echo json_encode($list);
