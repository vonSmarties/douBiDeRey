<?php
include_once 'class/MemberManager.php';

$data = json_decode(file_get_contents('php://input'));
$memberManager = new MemberManager();
session_start();

if ($_SESSION["magicalUnicornToken"] == $data->magicalUnicornToken) {
    try {
        $update = true;
        foreach ($data as $datum) {
            $member = $memberManager->read($datum->id);
            $member->fill($datum);
            if (!$memberManager->update($member)) {
                $update = false;
            }
        }
        if ($update) {
            header('Content-Type: application/json');
            echo json_encode(["update" => "true"]);
        }
    } catch (Exception $ex) {
        header('Content-Type: application/json');
        echo json_encode([
            "update" => "false"
        ]);
    }
} else {
    header('Content-Type: application/json');
    echo json_encode([
        "unicorn" => "true"
    ]);
}
