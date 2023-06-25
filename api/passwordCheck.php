<?php
include_once 'class/PasswordManager.php';
include_once 'class/Password.php';
include_once 'class/RequestHandler.php';

$data = $requestHandler->publicRequest();
$password = $passwordManager->read(0);
try {
    if ($password->checkPassword($data->password)) {
        session_start();
        $_SESSION["magicalUnicornToken"] = md5(uniqid());
        $requestHandler->jsonResponse([
            "check" => true,
            "magicalUnicornToken" => $_SESSION["magicalUnicornToken"]
        ]);
    } else {
        $requestHandler->jsonResponse([
            "check" => false,
            "magicalUnicornToken" => "unicorn"
        ]);
    }
} catch (Exception $ex) {
    $requestHandler->jsonResponse([
        "check" => false,
        "exception" => $ex
    ]);
}
