<?php
include_once 'class/PasswordManager.php';
include_once 'class/Password.php';
include_once 'class/RequestHandler.php';

$data = $requestHandler->publicRequest();
session_start();

if (isset($_SESSION["magicalUnicornToken"]) && isset($data->magicalUnicornToken) && $_SESSION["magicalUnicornToken"] == $data->magicalUnicornToken) {
    $requestHandler->jsonResponse([
        "check" => true
    ]);
} else {
    $requestHandler->jsonResponse([
        "unicorn" => true
    ]);
}
