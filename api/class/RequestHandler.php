<?php

class RequestHandler
{
    private function getJsonContent()
    {
        return json_decode(file_get_contents('php://input'));
    }

    public function publicRequest()
    {
        return $this->getJsonContent();
    }

    public function privateRequest()
    {
        $data = $this->getJsonContent();
        session_start();
        if ($_SESSION["magicalUnicornToken"] == $data->magicalUnicornToken) {
            return $data;
        } else {
            $this->jsonResponse([
                "unicorn" => true
            ]);
            exit;
        }
    }

    public function privateFormData()
    {
        session_start();        
        if ($_SESSION["magicalUnicornToken"] != $_POST['magicalUnicornToken']) {
            $this->jsonResponse([
                "unicorn" => true
            ]);
            exit;
        }
    }

    public function jsonResponse(Array $data)
    {        
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: https://marcheurs-dou-bi-de-rey.fr');
        echo json_encode($data);
    }

    public function zipResponse($file)
    {
        header('Content-disposition: attachment; filename=Resumes.zip');
        header('Content-type: application/zip');
        header('Access-Control-Allow-Origin: https://marcheurs-dou-bi-de-rey.fr');
        readfile($file);
    }
}

$requestHandler = new RequestHandler();