<?php
include_once 'class/PasswordManager.php';
include_once 'class/Password.php';

$data = json_decode(file_get_contents('php://input'));

$passwordManager = new PasswordManager();
$password = $passwordManager->read(0);
try {
    if ($password->checkPassword($data->password)) {
        session_start();
        $_SESSION["magicalUnicornToken"] = md5(uniqid());
        header('Content-Type: application/json');
        echo json_encode([
            "check" => "true",
            "magicalUnicornToken" => $_SESSION["magicalUnicornToken"]
        ]);
    } else {
        header('Content-Type: application/json');
        echo json_encode([
            "check" => "false",
            "magicalUnicornToken" => "unicorn"
        ]);
    }
} catch (Exception $ex) {
    header('Content-Type: application/json');
    echo json_encode([
        "check" => "false",
        "exception" => $ex
    ]);
}
