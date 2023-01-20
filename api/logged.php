<?php
include_once 'class/PasswordManager.php';
include_once 'class/Password.php';

$data = json_decode(file_get_contents('php://input'));
session_start();

if (isset($_SESSION["magicalUnicornToken"]) && isset($data->magicalUnicornToken) && $_SESSION["magicalUnicornToken"] == $data->magicalUnicornToken) {
    header('Content-Type: application/json');
    echo json_encode([
        "check" => true
    ]);
} else {
    header('Content-Type: application/json');
    echo json_encode([
        "unicorn" => true
    ]);
}
