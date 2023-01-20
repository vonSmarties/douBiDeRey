<?php
include_once 'class/PasswordManager.php';
include_once 'class/Password.php';

$data = json_decode(file_get_contents('php://input'));

$passwordManager = new PasswordManager();
$password = new Password();
$password->fill($data);
try {
    $password->hashPassword();
    if ($passwordManager->create($password)) {
        header('Content-Type: application/json');
        echo json_encode([
            "create" => true
        ]);
    }
} catch (Exception $ex) {
    header('Content-Type: application/json');
    echo json_encode([
        "create" => false,
        "exception" => $ex
    ]);
}
