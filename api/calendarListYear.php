<?php
include_once 'class/CalendarManager.php';
include_once 'class/RequestHandler.php';

$requestHandler->jsonResponse($calendarManager->readListYear());
