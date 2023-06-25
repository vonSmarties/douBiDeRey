<?php
include_once 'class/PasswordManager.php';
include_once 'class/Password.php';
include_once 'class/RequestHandler.php';

$data = $requestHandler->publicRequest();
$password = new Password();
$password->fill($data);
try {
    $password->hashPassword();
    if ($passwordManager->create($password)) {
        $requestHandler->jsonResponse([
            "create" => true
        ]);
    }
} catch (Exception $ex) {
    $requestHandler->jsonResponse([
        "create" => false,
        "exception" => $ex
    ]);
}
